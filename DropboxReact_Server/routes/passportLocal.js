var passport = require('passport');
var passwordHash = require('password-hash');
var LocalStrategy = require('passport-local').Strategy;
//var mongoose = require('./mongoose');
var kafka = require('./kafka/client');


module.exports = function(passport) {
    passport.use('login', new LocalStrategy(function (username, password, done) {
        console.log('in passport use');
        //*********************** Without using Kafka *******************************
        // mongoose.UserData.findOne({email: username}, function (err, user,info) {
        //     if(err){
        //         console.log(err);
        //     }
        //     else{
        //         if(!user){
        //             console.log('not valid user');
        //              done(null,false,{ message: 'user does not exist' });
        //         }
        //         else{
        //             var check = passwordHash.verify(password, user.pwd);
        //             console.log('check'+check);
        //             if (check === true) {
        //                  done(null,{username: username, password: password});
        //             }
        //             else{
        //                  done(null,false,{message: "password incorrect"});
        //             }
        //
        //         }
        //     }
        // });
        //****************************************************************************

        kafka.make_request('login_topic', {"username": username, "password": password}, function (err, results) {
            console.log('in result');
            console.log(results);
            if (err) {
                done(err, {});
            }
            else {
                if (results.code == 200) {
                    done(null, {results:results.value});
                }
                else {
                    done(null, false, {message: results.value});
                }
            }
        });
    }));

    passport.use('register', new LocalStrategy({
        passReqToCallback: true
    },function ( req, username, password , done) {
        console.log('in passport use register');
        console.log(username);
        console.log(password);
        console.log(req.body);
        var hashedPassword = passwordHash.generate(password);
        kafka.make_request('register_topic', {
            "fname": req.body.fname,
            "lname": req.body.lname,
            "email": username,
            "password": hashedPassword
        }, function (err, results) {
            console.log('in result');
            console.log(results);
            if (err) {
                done(err, {});
                // console.log(err);
                // return res.status(500).send();
            }
            else {
                // if(results.code == 200){
                //     done(null,{username:results.value.username,password:results.value.password});
                // }
                // else {
                done(null, {message: results.value});
                //}
                //return res.status(200).send({message:"User Registered!!"})
            }
        });
    }));
};

