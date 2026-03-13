RubyLabs Test Project

The script fetches and processes user, post, and comment data from https://jsonplaceholder.typicode.com/.

## Functionality
1. Fetches users
3. Fetch data sorted by ID in descending order (effectively latest by creation time if IDs are sequential)
sorted by ID (latest by creation order)
4. Fetches comments – gets the latest 3 comments per post (sorted by date or by ID)  
5. Validates data – checks for required fields and logs any issues  
6. Writes everything to a CSV file called "output.csv"

Concurrent loading – uses `Promise.all` in conjunction with the `axios` package to speed up comment fetching.
- Concurrent loading – uses "Promise.all" to speed up comment fetching using axios package
- Retries with exponential backoff – failed API requests are retried automatically with delay  
- Logging – logs all key actions, retries, and any issues  
- Error handling – handles errors without stopping the whole script

## Dependencies
- axios – for making API requests  
- csv-writer – to write data to CSV

## Configuration
javascript
* javascript
const CONFIG = {
  API_URL: 'https://jsonplaceholder.typicode.com',
  MAX_ITEMS: 100
};

  baseUrl: "https://jsonplaceholder.typicode.com",
  maxRetries: 3,           // Maximum number of retries
  retryDelay: 1000,        // Base delay between retries (ms)
  postsPerUser: 5,         // Number of posts per user
  commentsPerPost: 3,      // Number of comments per post
  outputFile: 'output.csv' // Output CSV file name
}

## Error Handling
Network/API failures (with retries)
Missing or bad data (logged, skipped)
File writing issues
Unexpected runtime errors

1. Clone or download the project folder:
** git clone https://github.com/your-username/rublylabs-test.git
`npm install`
2. Install (Make sure you have Node.js installed):
`npm start`
3. Run script:
** npm start
`Excel or Google Sheets`
4. You can open output.csv using:
`type output.csv`
OR 
** type output.csv
On Windows: `type output.csv`, On Linux/macOS: `cat output.csv`




