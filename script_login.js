/* =========================================================================== */
/* LOGIN PROCESS							       */
/* =========================================================================== */

//	Require part
var url = require('url');
var querystring = require('querystring');
var db = require('./script_db');

var doLogin = function (req, res, data, col, admin) {
    var users = db.getCollection(data, col);
    var param = querystring.parse(url.parse(req.url).query);
    var u_login = param['login'];
    var u_pwd = param['pwd'];
    var user;

    users.find({login : u_login}, function (err, docs) {
	if (err) {
	    console.log('Login error : ' + err);
	    res.writeHead(500, {'Content-Type' : 'text/plain'});
	    res.end('Database error. Please try again later.');
	}
	else if (docs.length <= 0) {
	    res.writeHead(403, {'Content-Type' : 'text/plain' });
	    res.end('User dosen\'t exist');
	}
	else if (docs.length > 1) {
	    res.writeHead(409, {'Content-Type' : 'text/plain' });
	    res.end('Database error. Please contact administrator.');
	}
	else {
	    user = docs[0];
	    if (user.status == "banned") {
		res.writeHead(403, {'Content-Type' : 'text/plain' });
		res.end("Account is banned. Contact admnistrator for details.");
	    }
	    else if (u_pwd === user.pwd && u_pwd.length == 64) {
		if (!admin) {
		    res.writeHead(200, {'Content-Type' : 'text/plain' });
		    res.end('Login successfull');
		}
		else {
		    if (user.type == "admin" || user.type == "superadmin") {
			res.writeHead(200, {'Content-Type' : 'text/plain' });
			res.end('Access Granted');
		    }
		    else {
			res.writeHead(403, {'Content-Type' : 'text/plain' });
			res.end('Access Denied');
		    }
		}
	    }
	    else {
		res.writeHead(418, {'Content-Type' : 'text/plain' });
		res.end('Wrong password');
	    }
	}
	data.close();
    });
}

exports.doLogin = doLogin;