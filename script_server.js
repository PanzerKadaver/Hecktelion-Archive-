/* =========================================================================== */
/* SERVER PART								       */
/* =========================================================================== */

var express = require('express');

//	Init server
var server = express();

//	Configure server
var configureServer = function (s) {
    s.set('views', __dirname + '/views');
    s.use(express.static(__dirname + '/data'));
    s.engine('html', require('ejs').renderFile);
};

exports.configureServer = configureServer;
exports.getServer = server;