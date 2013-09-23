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
    var u_login = param['login'];
    var u_pwd = param['password'];
    users.find({login : u_login}, function (err, docs) {
	if (docs.length <= 0) {
	    res.writeHead(401, {'Content-Type' : 'text/plain' });
	    res.end('User dosen\'t exist. Please register.');
	}
	else if (docs.length > 1) {
	    res.writeHead(409, {'Content-Type' : 'text/plain' });
	    res.end('Database error. Please contact administrator.');
	}
	else {
	    if (u_pwd === docs[0].pwd) {
		res.writeHead(200, {'Content-Type' : 'text/plain' });
		res.end('Login successfull');
	    }
	    else {
		res.writeHead(418, {'Content-Type' : 'text/plain' });
		res.end('Unable to login. Bad password');
	    }
	}
	data.close();
    });
}

exports.doLogin = doLogin;