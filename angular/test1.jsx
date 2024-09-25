const https = require('https');

const listener = function(request, response) {
    // Log the request method and URL to the console
    console.log(`${request.method} ${request.url}`);

    // Set the response headers
    response.writeHead(200, {'Content-Type': 'text/html'});

    // Write the response body
    response.end('<h1>Hello World</h1>');
};

const server = https.createServer(listener);

server.listen(5500);

console.log("Server running");
