/* =========================================================================== */
/* SERVER PART								       */
/* =========================================================================== */

var express = require('express');

//	Init server
var server = express();

//	Configure server
var configureServer = function (server) {
    server.set('views', __dirname + '/views');
    server.use(express.static(__dirname + '/data'));
    server.engine('html', require('ejs').renderFile);
};

exports.configureServer = configureServer;
exports.server = server;