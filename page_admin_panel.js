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
    if (srv - usr > 500000 || srv - usr < 0 || srv - time > 500000 || srv - time < 0) {
	res.set('Content-Type', 'text/html');
	res.status(403);
	res.end("Session expired U: " + usr + " T: " + time + " S: " + srv);
    }
    else {
	res.set('Content-Type', 'text/html');
	res.status(200);
	res.render('admin-panel.html');
    }
};

exports.display = display;