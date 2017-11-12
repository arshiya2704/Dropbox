var mongoose = require('./mongoose');


function handle_request8(msg, callback){
    var res = {};
    console.log("In handle update request:"+ JSON.stringify(msg));
    var query = {'email': msg.email};
    var work = msg.work;
    var edu = msg.edu;
    var interest = msg.interest;
    mongoose.UserData.findOneAndUpdate(query, {work: work, edu: edu, interest: interest}, {upsert:true}, function(err, user,info){
        if (err) {
            console.log(err);
        }
        res.code="200";
        res.value= {work: work,edu:edu,interest:interest};
        callback(null,res);
    });


}

exports.handle_request8 = handle_request8;