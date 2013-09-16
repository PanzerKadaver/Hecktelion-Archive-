#!/bin/env node

/* =========================================================================== */
/* BASIC PART								       */
/* =========================================================================== */

//	Init server global var
var express = require('express');
var url = require('url');
var querystring = require('querystring');

//	Get network informations
var address  = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port    = process.env.OPENSHIFT_NODEJS_PORT || 8080;

/* =========================================================================== */
/* SERVER PART								       */
/* =========================================================================== */

//	Init server
var apollo1 = express();

//	Configure server
apollo1.set('views', __dirname + '/views');
apollo1.set('static', __dirname + '/public');
apollo1.engine('html', require('ejs').renderFile);

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
    res.render('index.html');
});

//	404 page
apollo1.use(function (req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, '404 Error : Page not found.');
});

//	Start server
apollo1.listen(port, address);
console.log("Server Apollo1 running at http://" + address + ":" + port + "/");
console.log("Connection to Soyouz11 established at " + connection_string);