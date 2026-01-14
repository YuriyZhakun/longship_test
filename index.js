const axios = require('axios');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// --- CONFIGURATION ---
const CONFIG = {
  baseUrl: 'https://jsonplaceholder.typicode.com',
  maxRetries: 3,       // Maximum number of retries
  retryDelay: 1000,    // Base delay between retries (ms)
  postsPerUser: 5,     // Limit posts per user
  commentsPerPost: 3,  // Limit comments per post
  outputFile: 'output.csv'
};

// --- UTILITIES ---
const log = (msg, type = 'INFO') => console.log(`[${type}] ${new Date().toISOString()} - ${msg}`);
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetches data with exponential backoff on failure.
 */
async function fetchWithRetry(url, retries = 0) {
  try {
    log(`Requesting: ${url}`);
    const { data } = await axios.get(url, { timeout: 10000 });
    return data;
  } catch (error) {
    if (retries < CONFIG.maxRetries) {
      const delay = CONFIG.retryDelay * Math.pow(2, retries);
      log(`Error fetching ${url}. Retrying in ${delay}ms...`, 'WARN');
      await sleep(delay);
      return fetchWithRetry(url, retries + 1);
    }
    log(`Failed to fetch data from ${url}: ${error.message}`, 'ERROR');
    throw error;
  }
}

// --- VALIDATION ---
const isValid = (item, requiredFields, type) => {
  const missing = requiredFields.filter(field => !item[field]);
  if (missing.length > 0) {
    log(`Invalid ${type} (ID: ${item.id}). Missing fields: ${missing.join(', ')}`, 'ERROR');
    return false;
  }
  return true;
};

// --- SORTING ---
// Sort by Date (if available), otherwise by ID (descending - newest first)
const sortDesc = (a, b) => (b.date && a.date) 
  ? new Date(b.date) - new Date(a.date) 
  : b.id - a.id;

// --- MAIN LOGIC ---
async function processData() {
  const records = [];

  try {
    // 1. Fetch Users
    const users = await fetchWithRetry(`${CONFIG.baseUrl}/users`);
    // Filter only users with even IDs
    const targetUsers = users.filter(u => u.id % 2 === 0);
    log(`Found ${targetUsers.length} users with even IDs.`);

    for (const user of targetUsers) {
      if (!isValid(user, ['id', 'name'], 'User')) continue;

      // 2. Fetch Posts for the user
      let posts = await fetchWithRetry(`${CONFIG.baseUrl}/posts?userId=${user.id}`);
      posts = posts.sort(sortDesc).slice(0, CONFIG.postsPerUser);

      // 3. Process Posts Concurrently
      // Use Promise.all to fetch comments for all posts of this user in parallel
      const postsPromises = posts.map(async (post) => {
        if (!isValid(post, ['id', 'title'], 'Post')) return;

        try {
          let comments = await fetchWithRetry(`${CONFIG.baseUrl}/comments?postId=${post.id}`);
          comments = comments.sort(sortDesc).slice(0, CONFIG.commentsPerPost);

          comments.forEach(comment => {
            if (isValid(comment, ['id', 'body', 'email'], 'Comment')) {
              records.push({
                userId: user.id,
                userName: user.name,
                postId: post.id,
                postTitle: post.title,
                commentId: comment.id,
                commentBody: comment.body,
                commentEmail: comment.email
              });
            }
          });
        } catch (err) {
          log(`Error processing post ${post.id}`, 'ERROR');
        }
      });

      await Promise.all(postsPromises);
    }

    // 4. Write to CSV
    if (records.length > 0) {
      const csvWriter = createCsvWriter({
        path: CONFIG.outputFile,
        header: [
          { id: 'userId', title: 'User ID' },
          { id: 'userName', title: 'User Name' },
          { id: 'postId', title: 'Post ID' },
          { id: 'postTitle', title: 'Post Title' },
          { id: 'commentId', title: 'Comment ID' },
          { id: 'commentBody', title: 'Comment Body' },
          { id: 'commentEmail', title: 'Comment Email' }
        ]
      });
      await csvWriter.writeRecords(records);
      log(`Successfully wrote ${records.length} records to ${CONFIG.outputFile}`);
    } else {
      log('No valid records to write.', 'WARN');
    }

  } catch (error) {
    log(`Critical execution error: ${error.message}`, 'ERROR');
    process.exit(1);
  }
}

// Start execution
processData();