/* =========================================================================== */
/* ADMIN PANEL								       */
/* =========================================================================== */

var url = require('url');
var querystring = require('querystring');

var display = function (req, res, user) {
    var param = querystring.parse(url.parse(req.url).query);
    var usr = user.last
    var time = param['timestamp'];
    var srv = new Date().getTime();
    var db = true;
    if ((srv - usr < 200000 && srv - usr > 0) || (srv - time < 200000 && srv - time > 0) || db) {
	res.set('Content-Type', 'text/html');
	res.status(200);
	res.render('admin-panel.html');
    }
    else {
	res.set('Content-Type', 'text/html');
	res.status(403);
	res.end("Session expired");
    }
};

exports.display = display;