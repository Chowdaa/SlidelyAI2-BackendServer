# SlidelyAI2-BackendServer

This repository contains the backend server for SlidelyAI2, built with TypeScript and Express. The server handles form submissions and retrieves saved submissions using a JSON file as a database.

## Features

- **/ping**: A GET request that always returns `true`.
- **/submit**: A POST request to submit form data with parameters: `name`, `email`, `phone`, `github_link`, and `stopwatch_time`.
- **/read**: A GET request to read a specific form submission using the `index` query parameter.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Chowdaa/SlidelyAI2-BackendServer.git
    cd SlidelyAI2-BackendServer
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Start the server:
    ```sh
    npm start
    ```

## Usage

### Ping
- **Endpoint**: `/ping`
- **Method**: GET
- **Response**: `true`

### Submit
- **Endpoint**: `/submit`
- **Method**: POST
- **Parameters**:
  - `name`: String
  - `email`: String
  - `phone`: String
  - `github_link`: String
  - `stopwatch_time`: Number

### Read
- **Endpoint**: `/read`
- **Method**: GET
- **Query Parameter**:
  - `index`: Number (0-based index)

## Database Structure

The submissions are stored in a JSON file (`db.json`). Each submission contains the following fields:
- `name`
- `email`
- `phone`
- `github_link`
- `stopwatch_time`

Example structure:
```json
[
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "123-456-7890",
    "github_link": "https://github.com/johndoe",
    "stopwatch_time": 120
  }
]

