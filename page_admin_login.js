/* =========================================================================== */
/* ADMIN LOGIN PAGE							       */
/* =========================================================================== */

var display = function (req, res, next) {
    res.set('Content-Type', 'text/html');
    res.status(200);
    res.render('admin-login.html');
};

exports.display = display;