                   /* You should implement your request handler function in this file.
 * And hey! This is already getting passed to http.createServer()
 * in basic-server.js. But it won't work as is.
 * You'll have to figure out a way to export this function from
 * this file and include it in basic-server.js so that it actually works.
 * *Hint* Check out the node module documentation at http://nodejs.org/api/modules.html. */
// export
//
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept, X-Parse-Application-Id, X-Parse-REST-API-Key",
  "access-control-max-age": 10 // Seconds.
};

var results = [];
var objectId = 0;
var url = require('url');
var path = require("path");
var fs = require("fs");

//setup server to serve html;

exports.handleRequest = function(request, response) {


//   var content = '';
//   var fileName = path.basename(request.url);//the file that was requested
//   var localFolder = __dirname + '/public/';//where our public files are located

//     //NOTE: __dirname returns the root folder that
//     //this javascript file is in.
// console.log("request.url:", request.url, "fileName", fileName);
//   if(fileName === 'index.html'){//if index.html was requested...
//     content = localFolder + fileName;//setup the file name to be returned
//     console.log("content:", content)
//         //reads the file referenced by 'content'
//         //and then calls the anonymous function we pass in
//     fs.readFile(content,function(err,contents){
//         //if the fileRead was successful...
//         if(!err){
//           console.log("no error");
//             //send the contents of index.html
//             //and then close the request
//             response.end(contents);
//         } else {
//             //otherwise, let us inspect the eror
//             //in the console
//             console.dir(err);
//         };
//       });
//   } else {
//       //if the file was not found, set a 404 header...
//       response.writeHead(404, {'Content-Type': 'text/html'});
//       //send a custom 'file not found' message
//       //and then close the request
//       response.end('<h1>Sorry, the page you are looking for cannot be found.</h1>');
//   };

  /* the 'request' argument comes from nodes http module. It includes info about the
  request - such as what URL the browser is requesting. */

  /* Documentation for both request and response can be found at
   * http://nodemanual.org/0.8.14/nodejs_ref_guide/http.html */

  console.log("Serving request type " + request.method + " for url " + request.url);

  var statusCode = 404;

  if (request.url === "/classes/messages" && request.method === "GET") {
    statusCode = 200;
  }

  if (request.url === "/classes/messages" && request.method === "OPTIONS") {
    statusCode = 200;
  }

  if (request.url === "/classes/messages" && request.method === "POST") {
    statusCode = 201;

    var string = "";
    request.on("data", function(text){
      string += text;
    });
    request.on("end", function() {
      var parsed = JSON.parse(string);
      //add a unique objectID to each message
      parsed["objectId"] = objectId;
      objectId++;

      //add a createdAt time
      parsed["createdAt"] = new Date();
      results.push(parsed);
    });
  }

  /* Without this line, this server wouldn't work. See the note
   * below about CORS. */
  var headers = defaultCorsHeaders;

  headers["Content-Type"] = "application/json";

  /* .writeHead() tells our server what HTTP status code to send back */
  response.writeHead(statusCode, headers);

  /* Make sure to always call response.end() - Node will not send
   * anything back to the client until you do. The string you pass to
   * response.end() will be the body of the response - i.e. what shows
   * up in the browser.*/
  // console.log(request);
  // if (request.method === 'POST') {
  // results.push(request.json);
  // }
  var messages = JSON.stringify({results: results});
  response.end(messages);
};

exports.handler = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);

  var statusCode = 404;
  if (request.url === "/classes/room1" && request.method === "GET") {
    statusCode = 200;
  }

  if (request.url === "/classes/room1" && request.method === "POST") {
    console.log("last test");
    statusCode = 201;

    var string = "";
    request.on("data", function(text){
      string += text;
    });

    request.on("end", function() {
      var parsed = JSON.parse(string);
      results.push(parsed);
    });
  }

  /* Without this line, this server wouldn't work. See the note
   * below about CORS. */
  var headers = defaultCorsHeaders;

  headers["Content-Type"] = "text/plain";

  /* .writeHead() tells our server what HTTP status code to send back */
  response.writeHead(statusCode, headers);

  /* Make sure to always call response.end() - Node will not send
   * anything back to the client until you do. The string you pass to
   * response.end() will be the body of the response - i.e. what shows
   * up in the browser.*/
  // console.log(request);
  // if (request.method === 'POST') {
  // results.push(request.json);
  // }
  var messages = JSON.stringify({results: results});

  response.end(messages);
};
/* These headers will allow Cross-Origin Resource Sharing (CORS).
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */

