// This class helps create a standard structure for successful API responses
class ApiResponse {
  // Constructor to initialize the response properties
  constructor(
    statusCode,        // HTTP status code (e.g., 200 for OK, 201 for Created)
    data,              // The data to send back to the client (can be anything)
    message = "Success" // Optional message, defaults to "Success"
  ) {
    this.statusCode = statusCode  // Store the HTTP status code
    this.data = data              // Store the response data
    this.message = message        // Store the response message
    // success is true if statusCode is less than 400 (meaning no error)
    this.success = statusCode < 400
  }
}

export { ApiResponse }
