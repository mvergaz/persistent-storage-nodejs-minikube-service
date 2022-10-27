var http = require('http');
const port = 8080;
const localPath = "/var/tmp/my-service/readme.txt"
const fs = require('fs');

var handleRequest = function (request, response) {
  if(request.url === "/favicon.ico"){
    response.end();
    return;
  }

  console.log(`Trying to read ${localPath}`);

  fs.readFile(localPath, 'utf8', (err, data) => {
    let httpCode = err ? 500 : 200,
      message = err ? err.message : data;
    response.writeHead(httpCode);
    response.end(message);
  });
};
var www = http.createServer(handleRequest);
www.listen(port);