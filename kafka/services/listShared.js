var mongoose = require('./mongoose');


function handle_request10(msg, callback){
    var res = {};
    console.log("In handle listShare request:"+ JSON.stringify(msg));
   mongoose.ShareData.find({user:msg.owner}).populate('fileId').exec(function (err,result) {
       if (err) {
           console.log(err);
           callback(err,null);
       }else {
           console.log(result);
           res.code='200';
           res.value=result;
           callback(null, res);
       }
   })

}

exports.handle_request10 = handle_request10;