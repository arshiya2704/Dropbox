var mongoose = require('./mongoose');
function handle_request1(msg, callback){

    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    var newUser = mongoose.UserData();
    newUser.fname = msg.fname;
    newUser.lname = msg.lname;
    newUser.email = msg.email;
    newUser.pwd = msg.password;

    newUser.save(function (err, savedUser) {
        if(err)
        {
            console.log(err);
            // return res.status(500).send();
            res.code = "500";
            //callback(null,res);
        }
        // return res.status(200).send({message:"User Registered!!"})
        res.code="200";
        res.value="User Registered!!";
        callback(null,res);
    });
}

exports.handle_request1 = handle_request1;