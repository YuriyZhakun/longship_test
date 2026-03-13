RubyLabs Test Project

The script fetches and processes user, post, and comment data from https://jsonplaceholder.typicode.com/.

## Functionality
1. Fetches users
2. Filters only users with even IDs  
3. Fetches posts - gets the latest 5 posts per user (sorted by date or by ID)  
4. Fetches comments – gets the latest 3 comments per post (sorted by date or by ID)  
5. Validates data – checks for required fields and logs any issues  
6. Writes everything to a CSV file called "output.csv"

## Features
- Concurrent loading – uses "Promise.all" to speed up comment fetching using axios package

    baseUrl: "https://jsonplaceholder.typicode.com",
- Error handling – handles errors without stopping the whole script

    }
- axios – for making API requests  
- csv-writer – to write data to CSV

## Configuration
- You can change main settings in the "CONFIG" object at the top of the index.js file:
const CONFIG = {
  baseUrl: "https://jsonplaceholder.typicode.com",
  maxRetries: 3,           // Maximum number of retries
  retryDelay: 1000,        // Base delay between retries (ms)
  postsPerUser: 5,         // Number of posts per user

  outputFile: 'output.csv' // Output CSV file name
}

## Error Handling
Network/API failures (with retries)
Missing or bad data (logged, skipped)
File writing issues
- axios - for making API requests

## Installation
1. Clone or download the project folder:
    git clone https://github.com/your-username/rubylabs-test.git
    cd rubylabs-test
2. Install (Make sure you have Node.js installed):
    npm install
- Network/API failures (with retries)
    npm start
It will create a file called output.csv in the root folder
3. You can open output.csv using:
** Excel or Google Sheets
OR 
    git clone https://github.com/your-username/rublylabs-test.git



Thank you for consideration!
