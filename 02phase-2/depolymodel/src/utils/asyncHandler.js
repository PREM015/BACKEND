// asyncHandler is a helper function to wrap async route handlers in Express
// It makes sure that any errors inside async functions are caught and passed to Express error handlers

const asyncHandler = (requestHandler) => {
  // Returns a new function that Express will use as middleware
      return (req, res, next) => {
    // Call the original async request handler and wrap it in a Promise
    // If it throws an error, catch it and pass the error to next() so Express can handle it
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
  }
}

export { asyncHandler }


/*

// These are alternative ways the asyncHandler function could be written:

const asyncHandler = () => {}
// An empty function, no implementation

const asyncHandler = (func) => () => {}
// A function that takes another function (func) and returns an empty function
// No actual error handling here, just a skeleton

const asyncHandler = (func) => async () => {}
// A function that takes func and returns an async function with no parameters and no body
// Still just a skeleton, not useful yet

const asyncHandler = (fn) => async (req, res, next) => {
  // This version uses try/catch inside the returned async function to catch errors

  try {
    // Await the original async function execution
    await fn(req, res, next)
  } catch (error) {
    // If an error occurs, send a JSON response with error info
    res.status(error.code || 500).json({
      success: false,
      message: error.message
    })
  }
}

*/
