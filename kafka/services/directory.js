var mongoose = require('./mongoose');
var fs = require('file-system');
var moment = require('moment');

function handle_request4(msg, callback){
    var res = {};
    var res1={};
    //console.log("In handle request:"+ JSON.stringify(msg));
    var newDir = mongoose.FileData();
    newDir.owner = msg.owner;
    newDir.name = msg.name;
    newDir.type = msg.type;
    newDir.fileType = msg.fileType;
    newDir.star='false';
    newDir.glyphVal='glyphicon glyphicon-star-empty';
    newDir.parent=msg.parent;
    var name= msg.name;
    var path = "/Users/arshiya/WebstormProjects/kafka/uploads/"+name;

    if (!fs.existsSync(path)){
        fs.mkdirSync(path);
    }

    newDir.save(function (err, savedFile) {
        if(err)
        {
            console.log(err);
            // return res.status(500).send();
            res.code = "500";
            //callback(null,res);
        }
        // return res.status(200).send({message:"User Registered!!"})
        else{
            var history = mongoose.TransactionData();
            history.owner = msg.owner;
            history.action = msg.owner + " created a directory " + msg.name + " at " + moment().format('MMMM Do YYYY, h:mm:ss a');
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
            res.value="Directory Created!!";
        }
        callback(null,res);
    });
}

exports.handle_request4 = handle_request4;