var mongoose = require('./mongoose');
var moment = require('moment');

function handle_request6(msg, callback){
    var res = {};
    var res1={};
    console.log("In handle del request:"+ JSON.stringify(msg));


    var query = {'name':msg.name,'owner': msg.owner};
    mongoose.FileData.findOneAndRemove(query, function(err){
        if (err) {
            console.log(err);
        }
        else{
            var history = mongoose.TransactionData();
            history.owner = msg.owner;
            history.action = msg.owner + " deleted " + msg.name + " at " + moment().format('MMMM Do YYYY, h:mm:ss a');
            history.save(function (err1, savedFile1) {
                if(err1)
                {
                    console.log(err);
                }
                else{
                    console.log("Transaction Updated");
                    res1.code="200";
                }
                callback(null,res1);
            });
            res.code="200";
            res.value="succesfully deleted";
        }
        callback(null,res);
    });
}

exports.handle_request6 = handle_request6;