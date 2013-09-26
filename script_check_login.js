/* =========================================================================== */
/* LOGIN CHECK PROCESS							       */
/* =========================================================================== */

//	Require part
var url = require('url');
var querystring = require('querystring');
var db = require('./script_db');

var doCheckLogin = function (req, res, data, col) {
    var users = db.getCollection(data, col);
    var param = querystring.parse(url.parse(req.url).query);
    var u_login = param['login'];

    users.find({login : u_login}, function (err, docs) {
	if (err) {
	    console.log('Check login error : ' + err);
	    res.writeHead(500, {'Content-Type' : 'text/plain'});
	    res.end('DB down. Try again later.');
	}
	else if (docs.length <= 0) {
	    res.writeHead(200, {'Content-Type' : 'text/plain' });
	    res.end('true');
	}
	else {
	    res.writeHead(418, {'Content-Type' : 'text/plain' });
	    res.end('Username already taken');
	}
	data.close();
    });
}

exports.doCheckLogin = doCheckLogin;