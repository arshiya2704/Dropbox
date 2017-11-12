var mongoose = require('./mongoose');
var fs = require('file-system');
function handle_request3(msg, callback){

    var res = {};
    console.log("In list handle request:"+ JSON.stringify(msg));
    mongoose.FileData.find({owner: msg.owner, parent: msg.parent}, function (err, user,info) {
        if(err){
            console.log(err);
        }
        else{

            var resArr=[];
            var content;
            console.log(user);
            console.log(user.length);
            for( var i= 0; i< user.length; i++){
                var obj={};
                // fs.readDir(user[i].path, function read(err, data) {
                //     if (err) {
                //         throw err;
                //     }
                //     content = data;
                //     console.log("content"+content);
                // });
                console.log(user[i].name);
                obj.type= user[i].type;
                obj.name= user[i].name;
                obj.owner= user[i].owner;
                obj.path= user[i].path;
                obj.fileType = user[i].fileType;
                obj.starVal=user[i].starVal;
                obj.glyphVal= user[i].glyphVal;
                obj.img = 'uploads/' + obj.name;
                obj.parent = user[i].parent;
                obj.id = user[i]._id;
                obj.cols = 2;
                resArr.push(obj);
            }
            console.log(resArr);
            var length= resArr.length;
            console.log(length);
            res.code="200";
            res.value=resArr;

        }
        callback(null, res);
    });
}

exports.handle_request3 = handle_request3;