RubyLabs Test Project

The script fetches and processes user, post, and comment data from https://jsonplaceholder.typicode.com/.

## Functionality
1. Fetches users
2. Filters only users with even IDs  
retrieves the latest posts (ordered by highest ID).
retrieves the latest comments (ordered by highest ID).
5. Validates data – checks for required fields and logs any issues  
6. Writes everything to a CSV file called "output.csv"

## Features
This functionality allows fetching data.
- Retries with exponential backoff – failed API requests are retried automatically with delay  
- Logging – logs all key actions, retries, and any issues  
- Error handling – handles errors without stopping the whole script

## Dependencies
- axios – for making API requests  
- csv-writer – to write data to CSV

## Configuration
- You can change main settings in the "CONFIG" object at the top of the index.js file:
javascript
const CONFIG = {
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

## Installation
1. Clone or download the project folder:
`git clone https://github.com/your-username/rubylabs-test.git`
`cd rubylabs-test`
2. Install (Make sure you have Node.js installed):
`npm install`
3. Run script:
`npm start`
It will create a file called output.csv in the root folder
4. You can open output.csv using:
Excel or Google Sheets
Alternatively, you can view its contents:
`type output.csv` (Windows) / `cat output.csv` (macOS/Linux)


Thank you for considoration!

