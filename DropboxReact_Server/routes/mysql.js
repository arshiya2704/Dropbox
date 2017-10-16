var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 100,
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'dropbox_users',
    port	 : 3306,
    debug: false
});
//Put your mysql configuration settings - user, password, database and port

function fetchData(callback,sqlQuery){

    console.log("\nSQL Query::"+sqlQuery);

    pool.getConnection(function(err, connection) {
        if (err) {
            connection.release();
            res.json({ "code": 100, "status": "Error in connection database" });
            return;
        }

        connection.query(sqlQuery, function(err, rows, fields) {
            if(err){
                console.log("ERROR: " + err.message);
            }
            else
            {	// return err or result
                console.log("DB Results:"+rows);
                callback(err, rows);
            }
        });
        connection.release();
    });


    /*pool.getConnection(function(err, connection) {
        if (err) {
            connection.release();
            res.json({ "code": 100, "status": "Error in connection database" });
            return;



        }



        console.log("\nConnection closed..");
        connection.end();
        );*/

}
function insertData(callback,sqlQuery){

    console.log("\nSQL Query::"+sqlQuery);

    pool.getConnection(function(err, connection) {
        if (err) {
            connection.release();
            res.json({ "code": 100, "status": "Error in connection database" });
            return;
        }

        connection.query(sqlQuery, function(err, rows, fields) {
            if(err){
                console.log("ERROR: " + err.message);
            }
            else
            {	// return err or result
                console.log("DB Results:"+rows);
                callback(err, rows);
            }
        });
        connection.release();
    });

    /*connection.query(sqlQuery, function(err, rows, fields) {
        if(err){
            console.log("ERROR: " + err.message);
        }
        else
        {	// return err or result
            console.log("DB Results:"+rows);
            callback(err, rows);
        }
    });*/
    console.log("\nConnection closed..");
   // connection.end();
}

exports.fetchData=fetchData;
exports.insertData=insertData;