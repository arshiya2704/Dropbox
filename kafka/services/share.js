var mongoose = require('./mongoose');

function handle_request7(msg, callback){
    var res = {};
    console.log("In handle share request:"+ JSON.stringify(msg));
    var newSharedFile = mongoose.ShareData();
    newSharedFile.user = msg.email;
    newSharedFile.fileId = msg.id;
    newSharedFile.sharedBy = msg.sharedBy;
    newSharedFile.save(function (err, savedUser) {
        if(err)
        {
            console.log(err);
            res.code = "500";
        }
        else{
            res.code="200";
            res.value="File Shared!!";
        }
        callback(null,res);
    });

}

exports.handle_request7 = handle_request7;