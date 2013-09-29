/* =========================================================================== */
/* LOGIN PROCESS							       */
/* =========================================================================== */

//	Require part
var url = require('url');
var querystring = require('querystring');
var db = require('./script_db');

var doLogin = function (req, res, data, col, admin, saveTime, callback) {
    var users = db.getCollection(data, col);
    var param = querystring.parse(url.parse(req.url).query);
    var u_login = param['login'];
    var u_pwd = param['pwd'];
    var time = param['timestamp'];
    var user;

    users.find({login : u_login}, function (err, docs) {
	if (err) {
	    console.log('Login error : ' + err);
	    res.writeHead(500, {'Content-Type' : 'text/plain'});
	    res.end('Database error. Please try again later.');
	    data.close();
	}
	else if (docs.length <= 0) {
	    res.writeHead(403, {'Content-Type' : 'text/plain' });
	    res.end('User dosen\'t exist');
	    data.close();
	}
	else if (docs.length > 1) {
	    res.writeHead(409, {'Content-Type' : 'text/plain' });
	    res.end('Database error. Please contact administrator.');
	    data.close();
	}
	else {
	    user = docs[0];
	    if (user.status == "banned") {
		res.writeHead(403, {'Content-Type' : 'text/plain' });
		res.end("Account is banned. Contact admnistrator for details.");
		data.close();
	    }
	    else if (u_pwd === user.pwd && u_pwd.length == 64) {
		var doNext = function () {
		    if (!admin) {
			if (!callback) {
			    res.writeHead(200, {'Content-Type' : 'text/plain' });
			    res.end('Login successfull');
			    data.close();
			}
			else {
			    callback(req, res, user);
			    data.close();
			}
		    }
		    else {
			if (user.type == "admin" || user.type == "superadmin") {
			    if (!callback) {
				res.writeHead(200, {'Content-Type' : 'text/plain' });
				res.end('Access Granted');
				data.close();
			    }
			    else {
				callback(req, res, user);
				data.close();
			    }
			}
			else {
			    res.writeHead(403, {'Content-Type' : 'text/plain' });
			    res.end('Access Denied');
			    data.close();
			}
		    }
		}
		if (!saveTime)
		    doNext();
		else {
		    user.last = time;
		    users.save(user, function (err) {
			if (err) {
			    console.log('Login error : ' + err);
			    res.writeHead(500, {'Content-Type' : 'text/plain'});
			    res.end('Database error. Please try again later.');
			    data.close();
			}
			else {
			    doNext();
			}
		    });
		}
	    }
	    else {
		res.writeHead(418, {'Content-Type' : 'text/plain' });
		res.end('Wrong password');
		data.close();
	    }
	}
    });
}

exports.doLogin = doLogin;