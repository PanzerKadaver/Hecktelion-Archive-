/* =========================================================================== */
/* KEYS FUNCTION							       */
/* =========================================================================== */

//	Require part
var url = require('url');
var querystring = require('querystring');
var db = require('./script_db');

var isValidKey = function (key, type, data, col, callback) {
    var keys = db.getCollection(data, col);
    var key;
    var sta;
    var res;

    keys.find({value : key}, function (err, docs) {
	if (err) {
	    console.log("Key validation error : " + err);
	    key = false;
	    sta = 500;
	    res = "Database error. Try again later.";
	}
	else if (docs.length <= 0) {
	    key = false;
	    sta = 403;
	    res = "Unrecognized key";
	}
	else {
	    key = docs[0];
	    if (key.type != type) {
		key = false;
		sta = 403;
		res = "Bad key type";
	    }
	    else if (key.activated == false) {
		key = false;
		sta = 403;
		res = "Key has expired";
	    }
	    else if (key.multi == false && key.used == true) {
		key = false;
		sta = 403;
		res = "Key already used";
	    }
	}
	callback(key, sta, res);
    });
}

exports.isValidKey = isValidKey;