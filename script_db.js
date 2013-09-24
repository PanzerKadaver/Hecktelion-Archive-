/* =========================================================================== */
/* DB PART								       */
/* =========================================================================== */

var mongojs = require('mongojs');

//	Set the base connection string
var connection_string = '127.0.0.1:27017/';
if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":"
    connection_string += process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@"
    connection_string += process.env.OPENSHIFT_MONGODB_DB_HOST + ':'
    connection_string += process.env.OPENSHIFT_MONGODB_DB_PORT + '/'
}

var options = '/?'
options += 'connectTimeoutMS=20000'
options += '&'
options += 'socketTimeoutMS=20000'

var getConnection = function () {
    return (connection_string);
}

var connectToDB = function (server, db_name, opt) {
    if (opt == true)
	return (mongojs(server + db_name + options));
    else
	return (mongojs(server + db_name));
}

var getCollection = function (db, c) {
    return (db.collection(c));
}

exports.getConnection = getConnection;
exports.connectToDB = connectToDB;
exports.getCollection = getCollection;