/* =========================================================================== */
/* 404 PAGE								       */
/* =========================================================================== */

var display = function (req, res, next) {
    res.set('Content-Type', 'text/html');
    res.status(404);
    res.render('404.html');
};

exports.display = display;
