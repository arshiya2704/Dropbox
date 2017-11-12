var mongoose = require('./mongoose');


function handle_request9(msg, callback){
    var res = {};
    console.log("In handle logs request:"+ JSON.stringify(msg));
    mongoose.TransactionData.find({owner: msg.owner}, function (err, user,info) {
        if(err){
            console.log(err);
        }
        else{
            var resArr=[];
            console.log(user);
            console.log(user.length);
            for( var i= 0; i< user.length; i++){
                var obj={};
                obj.action= user[i].action;
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

exports.handle_request9 = handle_request9;