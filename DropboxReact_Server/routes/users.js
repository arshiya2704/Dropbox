var express = require('express');
var router = express.Router();
var mysql =require('./mysql');
var passwordHash = require('password-hash');
var session;


router.post('/api/doLogin', function (req, res) {
    console.log('doLogin is being called');
    console.log(req.body);
    var email = req.body.userData.email;
    var pwd = req.body.userData.password;
    console.log(email);
    console.log(pwd);
    var getUser="select * from info where email='"+email+"'";
    mysql.fetchData(function(err,results){
        if(err){
            throw err;
        }
        else {
            console.log(results);
            if(!results.length){
                res.send({message: "user does not exist"});
            }
            else{
                console.log(pwd);
                var check = passwordHash.verify(pwd, results[0].pwd);
                console.log(check);
                console.log(results[0].pwd);
                if (check === true) {
                    // req.session.email = email;
                    // req.session.save();
                    session= req.session;
                    session.email = email;
                    session.save();
                    console.log("Session initialized");
                    res.send({
                        message: "logged in",
                        email: results[0].email
                    });
                }
                else{
                    res.send({message: "password incorrect"});
                }
            }
        }
    },getUser);
});


router.post('/api/checkSession', function (req, res){
   // console.log("Client Username check"+ req.session.email);
    if(session.email)
        res.send({owner:session.email,status:200});
    else
        res.status (500).send();

});

router.post('/api/doRegister', function (req, res) {
    console.log('doRegister is being called');
    console.log(req.body);
    var fname = req.body.formData.Fname;
    var lname = req.body.formData.Lname;
    var email = req.body.formData.email;
    var pwd = req.body.formData.password;
    console.log(fname);
    console.log(lname);
    console.log(email);
    console.log(pwd);
    var hashedPassword = passwordHash.generate(pwd);
    var insertUser="insert into info (fname, lname, email, pwd) values ( '"+ fname +"','" + lname +"','" + email +"','" + hashedPassword + "');" ;
    console.log(insertUser);
    mysql.insertData(function(err,results){
        if(err){
            throw err;
        }
        else {
            res.send({message:"User Registered!!"});

        }

    },insertUser);

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
    var updateUser="update info set work='"+work+"', edu ='"+edu+"', interest='"+interest+"' where email='"+email+"';" ;
    console.log(updateUser);
    mysql.insertData(function(err,results){
        if(err){
            throw err;
        }
        else {
            res.send({message:"Updated"});

        }

    },updateUser);

});

module.exports = router;