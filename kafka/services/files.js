var mongoose = require('./mongoose');
var Buffer = require('Buffer');
var fs = require('file-system');
var multer = require('multer');
var moment = require('moment');



function handle_request2(msg, callback){

   // var upload = multer({storage:storage}).single('mypic');

    var res = {};
    var res1={};
    //console.log("In handle request:"+ JSON.stringify(msg));
    var newFile = mongoose.FileData();
    console.log(msg.img.data);
    var buf = new Buffer.from(msg.img.data);
    console.log(buf);
    var name= msg.name;
    var path = "/Users/arshiya/WebstormProjects/kafka/uploads/"+name;
    fs.writeFile(path, buf,'binary',function(error) {
        if (error) {
            console.error("write error:  " + error.message);
        } else {
            console.log("Successful Write to " + path);
        }
    });
    newFile.path = path;
    newFile.owner = msg.owner;
    newFile.name = msg.name;
    newFile.type = msg.type;
    newFile.fileType = msg.fileType;
    newFile.starVal='false';
    newFile.glyphVal='glyphicon glyphicon-star-empty';
    newFile.parent=msg.parent;

    newFile.save(function (err, savedFile) {
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
            history.action = msg.owner + " uploaded a file " + msg.name + " at " + moment().format('MMMM Do YYYY, h:mm:ss a');
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
            res.value="File Uploaded!!";
        }
        callback(null,res);
    });
}

exports.handle_request2 = handle_request2;