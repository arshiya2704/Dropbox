var mongoose = require('./mongoose');
var passwordHash = require('password-hash');
function handle_request(msg, callback){

    var res = {};
    console.log("In handle login request:"+ JSON.stringify(msg));


        mongoose.UserData.findOne({email: msg.username}, function (err, user,info) {
            console.log(user);
            if(err){
                console.log(err);
            }
            else{
                if(!user){
                    console.log('not valid user');
                    res.code = "401";
                    res.value = "user does not exist";
                     //done(null,false,{ message: 'user does not exist' });
                }
                else{
                    var check = passwordHash.verify(msg.password, user.pwd);
                    console.log('check'+check);
                    if (check === true) {
                        res.code = "200";
                        res.value = user;
                        // done(null,{username: username, password: password});
                    }
                    else{
                        res.code = "401";
                        res.value = "password incorrect";
                         //done(null,false,{message: "password incorrect"});
                    }

                }
            }
            callback(null, res);
        });
}

exports.handle_request = handle_request;