/* =========================================================================== */
/* LOGIN PROCESS							       */
/* =========================================================================== */

//	Require part
var url = require('url');
var querystring = require('querystring');
var db = require('./script_db');

var doLogin = function (req, res, data, col) {
    var users = db.getCollection(data, col);
    var param = querystring.parse(url.parse(req.url).query);
    var login = param['login'];
    var pwd = param['password'];
    console.log(login + ' : ' + pwd);
}

exports.doLogin = doLogin;