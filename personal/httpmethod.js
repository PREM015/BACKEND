// HTTP Methods in JavaScript (Express.js or general understanding)

// 1. GET
// - Used to retrieve data from the server.
// - Should NOT change server state (read-only).
// - Example: Fetching user profile.
app.get("/user", (req, res) => {
  res.send("Fetching user data");
});

// 2. POST
// - Used to send data to the server to create a new resource.
// - Changes server state.
// - Example: Creating a new user.
app.post("/user", (req, res) => {
  res.send("User created");
});

// 3. PUT
// - Used to update an existing resource (replaces entire resource).
// - Idempotent: same request multiple times → same result.
// - Example: Update entire user profile.
app.put("/user/:id", (req, res) => {
  res.send(`User ${req.params.id} updated (replaced)`);
});

// 4. PATCH
// - Used to partially update a resource.
// - Only updates fields sent in the request.
// - Example: Change user’s email only.
app.patch("/user/:id", (req, res) => {
  res.send(`User ${req.params.id} partially updated`);
});

// 5. DELETE
// - Used to delete a resource from the server.
// - Example: Deleting a user.
app.delete("/user/:id", (req, res) => {
  res.send(`User ${req.params.id} deleted`);
});

// 6. HEAD
// - Same as GET but **only retrieves headers**, not the body.
// - Used to check if a resource exists or get metadata.
app.head("/user", (req, res) => {
  res.end(); // Sends headers only, no content
});

// 7. OPTIONS
// - Used to describe allowed HTTP methods for a resource.
// - Commonly used in CORS pre-flight requests.
app.options("/user", (req, res) => {
  res.set("Allow", "GET, POST, PUT, PATCH, DELETE, OPTIONS").send();
});

// 8. TRACE
// - Used for diagnostic purposes (echoes back request).
// - Rarely used in practice due to security concerns.
// - Not supported in most modern frameworks like Express.js.
// Example (not in Express): Sent by tools like Postman or curl for debugging.


// 9. CONNECT
// - Used to establish a network connection (e.g., tunnel to a server via a proxy).
// - Rarely used in standard APIs.
// - Mostly handled at lower levels (e.g., HTTP proxies like NGINX or browser).
// - Not supported by Express.js directly.
// Example: Used in HTTPS proxying (like `CONNECT example.com:443 HTTP/1.1`)


// 10. ANY (Express-specific method)
// - Matches **any HTTP method** for a given route.
// - Used when you want to handle all methods the same way.
app.all("/any-route", (req, res) => {
  res.send(`Handled ${req.method} method at /any-route`);
});
