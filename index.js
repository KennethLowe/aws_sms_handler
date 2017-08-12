var http = require('http');
var aws = require('aws-lib');
var twilio  = require('twilio');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!\n');
}).listen(3001);

console.log('Server running at http://localhost:3001/');
