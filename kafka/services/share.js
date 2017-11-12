var mongoose = require('./mongoose');


function handle_request7(msg, callback){
    var res = {};
    console.log("In handle share request:"+ JSON.stringify(msg));
    mongoose.FileData.find({name: msg.name}, function (err, user,info) {
        if(err){
            console.log(err);
        }
        else{
                var obj = mongoose.FileData();
                obj.name= user[0].name;
                obj.type= user[0].type;
                obj.owner= msg.email;
                obj.fileType = user[0].fileType;
                obj.path= user[0].path;
                obj.fileType = user[0].fileType;
                obj.starVal='false';
                obj.glyphVal= 'glyphicon glyphicon-star-empty';
                console.log(obj);
                obj.save(function (err, savedFile) {
                if(err)
                {
                    console.log(err);
                    res.code = "500";
                }
                else{
                    res.code="200";
                    res.value="File Shared!!";
                }
                    callback(null, res);
            });
            }
    });

}

exports.handle_request7 = handle_request7;