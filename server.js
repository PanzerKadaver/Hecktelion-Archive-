#!/bin/env node
/* =========================================================================== */
/* BASIC PART								       */
/* =========================================================================== */

//	Init server global var
var url = require('url');
var querystring = require('querystring');

//	Init pages
var index = require('./page_index');
var notfound = require('./page_404');

//	Init scripts
var newserver = require('./script_newserver');

//	Get network informations
var address  = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port    = process.env.OPENSHIFT_NODEJS_PORT || 8080;

//	Init monitoring
var monitoring = require('strong-agent').profile(
    '992ece8823bf97b7819a93ad7f0b322b',			// Nodefly app key
    'hecktelion'					// App name
);

/* =========================================================================== */
/* SERVER PART								       */
/* =========================================================================== */

var apollo1 = newserver.server;
newserver.configureServer(apollo1);

/* =========================================================================== */
/* DB PART								       */
/* =========================================================================== */

var connection_string = '127.0.0.1:27017/';
if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":"
    connection_string += process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@"
    connection_string += process.env.OPENSHIFT_MONGODB_DB_HOST + ':'
    connection_string += process.env.OPENSHIFT_MONGODB_DB_PORT + '/'
}

/* =========================================================================== */
/* ROUTES								       */
/* =========================================================================== */

//	Index page
apollo1.get('/', function (req, res) {
    index.display(req, res);
    res.end();
});

//	404 page
apollo1.use(function (req, res, next) {
    notfound.display(res, res, next);
    res.end();
});


/* =========================================================================== */

//	Start server
apollo1.listen(port, address);
console.log("Server Apollo1 running at http://" + address + ":" + port + "/");
console.log("Connection to Soyouz11 established at " + connection_string);