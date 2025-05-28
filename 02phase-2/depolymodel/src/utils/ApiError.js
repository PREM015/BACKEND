// Custom error class to handle API errors in a structured way
class ApiError extends Error {
    // Constructor to create an ApiError object with details
    constructor(
        statusCode,            // HTTP status code (e.g., 404, 500)
        message = "Something went wrong",  // Error message to send (default if not provided)
        errors = [],           // Optional array of detailed error info (default empty)
        stack = ""             // Optional stack trace string
    ) {
        super(message)         // Call the parent Error class constructor with the message

        this.statusCode = statusCode  // Store the HTTP status code
        this.data = null              // You can store any extra data here (currently null)
        this.message = message        // Store the error message
        this.success = false          // A flag to indicate the request was not successful
        this.errors = errors          // Store the detailed errors array

        // If a stack trace string is provided, use it
        if (stack) {
            this.stack = stack
        } else {
            // Otherwise, capture the current stack trace automatically
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError }
