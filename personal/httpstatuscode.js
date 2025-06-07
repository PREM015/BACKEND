// HTTP STATUS CODES
// Each status code has a meaning. They are grouped by type.

// 1xx: Informational – Request received, continuing process
// These are rarely used in everyday web dev.

console.log("100 Continue – Server received request headers, ready for body.");
console.log("101 Switching Protocols – Client requests to switch protocol.");
console.log("102 Processing (WebDAV) – Server received and is processing, no response yet.");

// 2xx: Success – The action was successfully received and understood

console.log("200 OK – Standard response for success.");
console.log("201 Created – New resource created successfully.");
console.log("202 Accepted – Request accepted but not yet processed.");
console.log("203 Non-Authoritative Information – Metadata modified by proxy.");
console.log("204 No Content – Success, but no data to send back.");
console.log("205 Reset Content – Client should reset the form/view.");
console.log("206 Partial Content – Server is delivering part of the resource (used in range requests).");

// 3xx: Redirection – Further action needed to complete the request

console.log("300 Multiple Choices – Multiple possible responses.");
console.log("301 Moved Permanently – Resource has moved permanently.");
console.log("302 Found – Temporary redirect.");
console.log("303 See Other – Redirect to another URI with GET.");
console.log("304 Not Modified – Resource hasn’t changed, use cached version.");
console.log("307 Temporary Redirect – Like 302, but doesn’t change HTTP method.");
console.log("308 Permanent Redirect – Like 301, but doesn’t change HTTP method.");

// 4xx: Client Errors – Request had an error, client side issue

console.log("400 Bad Request – The request was malformed.");
console.log("401 Unauthorized – Authentication required.");
console.log("403 Forbidden – You don't have permission.");
console.log("404 Not Found – Resource not found.");
console.log("405 Method Not Allowed – HTTP method not supported.");
console.log("406 Not Acceptable – Content type not acceptable.");
console.log("408 Request Timeout – Client took too long to send request.");
console.log("409 Conflict – Request conflicts with current state.");
console.log("410 Gone – Resource permanently gone.");
console.log("413 Payload Too Large – Request entity too large.");
console.log("415 Unsupported Media Type – Media type not supported.");
console.log("429 Too Many Requests – Rate limit exceeded.");

// 5xx: Server Errors – Server failed to fulfill a valid request

console.log("500 Internal Server Error – General server error.");
console.log("501 Not Implemented – Server doesn’t support the functionality.");
console.log("502 Bad Gateway – Invalid response from upstream server.");
console.log("503 Service Unavailable – Server is down or overloaded.");
console.log("504 Gateway Timeout – Upstream server didn’t respond.");
console.log("505 HTTP Version Not Supported – Version not supported.");

// ✅ Most common to remember:
// 200 – OK
// 201 – Created
// 204 – No Content
// 400 – Bad Request
// 401 – Unauthorized
// 403 – Forbidden
// 404 – Not Found
// 500 – Internal Server Error
