/* =========================================================================== */
/* REGISTER PROCESS							       */
/* =========================================================================== */

//	Require part
var url = require('url');
var querystring = require('querystring');
var db = require('./script_db');
var key = require('./script_keys');

var doRegister = function (req, res, data, col_u, col_k) {
    var users = db.getCollection(data, col_u);
    var keys = db.getCollection(data, col_k);
    var param = querystring.parse(url.parse(req.url).query);
    var u_login = param['login'];
    var u_pwd = param['pwd'];
    var u_vpwd = param['vpwd'];
    var u_mail = param['mail'];
    var alpha_key = param['alpha-key'];
    var u_time = param['timestamp'];
    var new_user;

    key.isValidKey(alpha_key, 'alpha', data, col_k, function (u_key, k_sta, k_res) {
	if (u_key == false) {
	    res.writeHead(k_sta, {'Content-Type' : 'text/plain'});
	    res.end(k_res);
	    data.close();
	}
	else {
	    if (u_pwd != u_vpwd) {
		res.writeHead(400, {'Content-Type' : 'text/plain'});
		res.end("Passwords doesn't match");
		data.close();
	    }
	    else {
		users.find({login : u_login}, function (err, docs) {
		    if (err) {
			console.log('Add user err : ' + err);
			res.writeHead(500, {'Content-Type' : 'text/plain'});
			res.end("Database error. Try again later.");
			data.close();
		    }
		    else if (docs.length >= 1) {
			res.writeHead(409, {'Content-Type' : 'text/plain'});
			res.end("User already exist");
			data.close();
		    }
		    else {
			new_user = {
			    login : u_login,
			    pwd : u_pwd,
			    mail : u_mail,
			    register : u_time,
			    keys : new Array(u_key),
			    type : "user",
			    status : "active"
			};
			u_key.used = true;
			u_key.users.push(u_login);
			keys.save(u_key, function (err) {
			    if (err) {
				console.log('Key save err : ' + err);
				res.writeHead(500, {'Content-Type' : 'text/plain'});
				res.end("Database error. Try again later.");
				data.close();
			    }
			    else {
				users.save(new_user, function (err) {
				    if (err) {
					console.log('User save err : ' + err);
					res.writeHead(500, {'Content-Type' : 'text/plain'});
					res.end("Database error. Try again later.");
					data.close();
				    }
				    else {
					res.writeHead(201, {'Content-Type' : 'text/plain'});
					res.end("Registration successfull");
					data.close();
				    }
				});
			    }
			});
		    }
		});
	    }
	}
    });
}

exports.doRegister = doRegister;