/* =========================================================================== */
/* INDEX PAGE								       */
/* =========================================================================== */

var display = function (req, res) {
    res.set('Content-Type', 'text/html');
    res.status(200);
    res.render('index.html');
};

exports.display = display;