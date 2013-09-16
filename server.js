#!/bin/env node

var http = require('http');

//	Get network informations
var address  = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port    = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var connection_string = '127.0.0.1:27017/nodemongo';
if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":"
    connection_string += process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@"
    connection_string += process.env.OPENSHIFT_MONGODB_DB_HOST + ':'
    connection_string += process.env.OPENSHIFT_MONGODB_DB_PORT + '/'
    connection_string += process.env.OPENSHIFT_APP_NAME;
}

var soyouz11;

var appollo1 = http.createServer(function (req, res) {
    res.writeHead(200);
    res.end('Hello world');
});

appollo1.listen(port, address);
console.log("Server Appollo1 running at http://" + address + ":" + port + "/");
console.log("Connection to Soyouz11 established at " + connection_string);