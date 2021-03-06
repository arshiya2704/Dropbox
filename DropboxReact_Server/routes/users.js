var express = require('express');
var router = express.Router();
var mysql =require('./mysql');
// var passwordHash = require('password-hash');
var passport = require('passport');
require('./passportLocal')(passport);
//var mongoose = require('./mongoose');
var session;
var kafka = require('./kafka/client');




module.exports = function (app) {

    app.use(passport.initialize());

    router.post('/api/doLogin', function(req, res) {
        console.log(req.body);
        passport.authenticate('login', function(err, user,info) {
            console.log(user);
            console.log(info);
            if(err) {
                res.status(500).send();
                console.log('error');
            }

            if(!user) {
                console.log('error1');
                res.send(info);
            }
            else{
                session= req.session;
                session.email = user.results.email;
                session.edu = user.results.edu;
                session.work= user.results.work;
                session.interest= user.results.interest;
                session.save();
                console.log("Session initialized");
                res.send({ message: 'logged in',
                email: user.results.email});
            }
        })(req,res);

        // MySQL Code
        //var getUser="select * from info where email='"+email+"'";
        // mysql.fetchData(function(err,results){
        //     if(err){
        //         throw err;
        //     }
        //     else {
        //         console.log(results);
        //         if(!results.length){
        //             res.send({message: "user does not exist"});
        //         }
        //         else{
        //             console.log(pwd);
        //             var check = passwordHash.verify(pwd, results[0].pwd);
        //             console.log(check);
        //             console.log(results[0].pwd);
        //             if (check === true) {
        //                 session= req.session;
        //                 session.email = email;
        //                 session.save();
        //                 console.log("Session initialized");
        //                 res.send({
        //                     message: "logged in",
        //                     email: results[0].email
        //                 });
        //             }
        //             else{
        //                 res.send({message: "password incorrect"});
        //             }
        //         }
        //     }
        // },getUser);
        //***************************************************************************************

    });



    router.post('/api/checkSession', function (req, res){
        if(session.email)
            res.send({owner:session.email,work: session.work,edu:session.edu,interest:session.interest,status:200});
        else
            res.status (500).send();

    });

    router.post('/api/doRegister', function (req, res) {
        console.log('doRegister is being called');
        console.log(req.body);
        // var fname = req.body.formData.Fname;
        // var lname = req.body.formData.Lname;
        // var email = req.body.formData.email;
        //var pwd = req.body.password;
        // console.log(fname);
        // console.log(lname);
        // console.log(email);
        // console.log(pwd);
        //var hashedPassword = passwordHash.generate(pwd);

        // MySQL Code
        // var insertUser="insert into info (fname, lname, email, pwd) values ( '"+ fname +"','" + lname +"','" + email +"','" + hashedPassword + "');" ;
        // console.log(insertUser);
        // mysql.insertData(function(err,results){
        //     if(err){
        //         throw err;
        //     }
        //     else {
        //         res.send({message:"User Registered!!"});
        //
        //     }
        //
        // },insertUser);
        //***************************************************************************************

        // Without using passport
        // var newUser = mongoose.UserData();
        // newUser.fname = fname;
        // newUser.lname = lname;
        // newUser.email = email;
        // newUser.pwd = hashedPassword;
        //
        // newUser.save(function (err, savedUser) {
        //     if(err)
        //     {
        //         console.log(err);
        //         return res.status(500).send();
        //     }
        //     return res.status(200).send({message:"User Registered!!"})
        // });
        //****************************************************************************************


        passport.authenticate('register', function(err, user,info) {
            console.log(user);
            console.log(info);
            if(err) {
                res.status(500).send();
                console.log('error');
            }

            if(!user) {
                console.log('error1');
                res.send(info);
            }
            else{
                return res.status(200).send({message:"User Registered!!"})
            }
        })(req,res);
    });

    router.post('/api/logout', function (req, res) {
        console.log('logout is being called');
        req.session.destroy(function(err) {
            if(err) {
                console.log(err);
            } else {
                res.send({status:200})
            }
        })});

    router.post('/api/doUpdate', function (req, res) {
        console.log('doUpdate is being called');
        console.log(req.body);
        var email = req.body.Email;
        var work = req.body.formData.Work;
        var edu = req.body.formData.Edu;
        var interest = req.body.formData.Interest;
        console.log(email);
        console.log(work);
        console.log(edu);
        console.log(interest);

        // MySQL Code
        // var updateUser="update info set work='"+work+"', edu ='"+edu+"', interest='"+interest+"' where email='"+email+"';" ;
        // console.log(updateUser);
        // mysql.insertData(function(err,results){
        //     if(err){
        //         throw err;
        //     }
        //     else {
        //         res.send({message:"Updated"});
        //
        //     }
        //
        // },updateUser);
        //*************************************************************************

        kafka.make_request('update_topic', {"email":email, "work": work, "edu": edu, "interest": interest}, function (err, results) {
            console.log('in update result');
            console.log(results);
            if (err) {
                throw err;
                return;
            }
            else {
                session.edu = results.value.edu;
                session.work= results.value.work;
                session.interest= results.value.interest;
                session.save();
                res.send({status:200,message:"Updated"});
                return;
            }
        });

    });

    router.post('/api/fetchLogs', function (req, res) {
        console.log('fetchLogs is being called');
        console.log(req.body);
        var owner = req.body.owner;
        kafka.make_request('logs_topic', {"owner": owner}, function (err, results) {
            console.log('in result');
            console.log(results);
            if (err) {
                throw err;
                return;
            }
            else {
                // if(results.value.starValue=== true){
                //     res.send({status:200,message:"Starred"});
                //     return;
                // }
                // else{
                res.send({status: 200, message: results.value});
                return;
            // }

            }
        });

    });


    app.use('/users',router);
};