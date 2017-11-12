var express = require('express');
const fileUpload = require('express-fileupload');
var fs = require('fs');
var router = express.Router();
var mysql = require('./mysql');
//var multer = require('multer');
//var glob = require('glob');
var kafka = require('./kafka/client');

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public/uploads/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + '.jpeg')
//     }
// });
//
// var upload = multer({storage:storage}).single('mypic');

/* GET users listing. */


router.use(fileUpload({preserveExtension:true}));

    router.post('/', function (req, res) {
        console.log('get is being called');
        console.log(req.body);
        var owner=req.body.value;
        var parent = req.body.parent;
        console.log(owner);
        console.log(parent);
        // MySQL Code
        // var getFile = "select * from file_info where owner ='"+ owner +"';";
        // console.log(getFile);
        // mysql.fetchData(function(err,results){
        //     if(err){
        //         throw err;
        //         return;
        //     }
        //     else
        //     {
        //         console.log(results);
        //         console.log(results.length);
        //         var imgArr=[];
        //         for(var i=0; i< results.length;i++){
        //             var record={};
        //             record.path=results[i].path;
        //             record.fileType=results[i].fileType;
        //             record.owner=results[i].owner;
        //             record.fileName=results[i].fileName;
        //             record.fileID=results[i].fileid;
        //             if (record.fileType==='F') {
        //                 record.img = 'uploads/' + record.path.split('/')[2];
        //                 record.cols = 2;
        //             }
        //
        //             imgArr.push(record);
        //         }
        //         console.log(imgArr);
        //         res.status(200).send(imgArr);
        //         return;
        //
        //     }
        // },getFile);
        // // //res.status(200).send(resArr1);
        //********************************************************************************
        kafka.make_request('list_topic', {"owner": owner, "parent": parent}, function (err, results) {
            console.log('in result');
            console.log(results);

            if (err) {
                throw err;
                return;
            }
            else {
                res.status(200).send(results.value);
            }
        });
    });



    router.post('/upload', function (req, res) {
        console.log('upload is being called');
        console.log(req.body);
        console.log(req.files);
        var img= req.files.mypic.data;
        var owner =req.body.owner;
        var name = req.files.mypic.name;
        var type = req.files.mypic.mimetype;
        var parent = req.body.parent;
        console.log(img);
        console.log(owner);
        console.log(name);
        console.log(type);
        // MySQL Code
        // var insertFilePath= "insert into file_info (fileid, path, owner, fileType) values (DEFAULT ,'" + path + "','" + owner +"', 'F');";
        // console.log(insertFilePath);
        // mysql.insertData(function(err,results){
        //     if(err){
        //         throw err;
        //         return;
        //     }
        //     else {
        //         res.send({message:"File Uploaded!!"});
        //         return;
        //
        //     }
        //
        // },insertFilePath);
        // res.status(204);
        //************************************************************************

        kafka.make_request('upload_topic', {"img":img,"owner": owner, "name": name, "type": type, "fileType": "F", "parent": parent}, function (err, results) {
            console.log('in result');
            console.log(results);
            if (err) {
                throw err;
                return;
            }
            else {
                if(results.code==='200'){
                    res.send({status: 200,message:"File Uploaded!!"});
                }
                else{
                    res.send({status: 408,message:"File already exists!!"});
                }

            }
        });
    });

    router.post('/share', function (req, res) {
        console.log('share is being called');
        console.log(req.body);
        var fileId= req.body.fileId;
        var receiver =req.body.email;
        var sharedBy = req.body.owner;
        console.log(fileId);
        console.log(receiver);
        console.log(sharedBy);

        // MySQL Code
        // var shareFile= "insert into file_info (fileid, path, owner,fileType) values (DEFAULT ,'" + path + "','" + receiver +"', 'F');";
        // console.log(shareFile);
        // mysql.insertData(function(err,results){
        //     if(err){
        //         throw err;
        //         return;
        //     }
        //     else {
        //         res.send({message:"File Shared!!"});
        //         return;
        //
        //     }
        //
        // },shareFile);
        //********************************************************************

        kafka.make_request('share_topic', {"id":fileId,"email": receiver, "sharedBy": sharedBy}, function (err, results) {
            console.log('in result');
            console.log(results);
            if (err) {
                throw err;
                return;
            }
            else {
                if(results.code==='200'){
                    res.send({status: 200,message:"File Shared!!"});
                }
                else{
                    res.send({status: 408,message:"File already shared!!"});
                }

            }
        });

    });

    router.post('/createDir', function (req, res) {
        console.log('createDir is being called');
        console.log(req.body);
        var owner=req.body.owner;
        var name=req.body.dirName;
        var parent = req.body.parent;
        // MySQL Code
        // var createDir= "insert into file_info (fileid, path, owner, fileType, fileName) values (DEFAULT,'abcd','" + owner +"', 'D','"+ name +"');";
        // console.log(createDir);
        // mysql.insertData(function(err,results){
        //     if(err){
        //         console.log(err);
        //         throw err;
        //         return;
        //     }
        //     else {
        //         res.status(204).send({message:"Directory Created!!",
        //         fileType:'D'});
        //         return;
        //
        //     }
        //
        // },createDir);
        //**********************************************************************

        kafka.make_request('createDir_topic', {"name":name,"owner": owner,"fileType": "D","parent":parent}, function (err, results) {
            console.log('in result');
            console.log(results);
            if (err) {
                throw err;
                return;
            }
            else {
                if(results.code==='200'){
                    res.send({status: 200,message:"Directory Created!!"});
                }
                else{
                    res.send({status: 408,message:"Directory already exists!!"});
                }

            }
        });

    });

router.post('/api/doStar', function (req, res) {
    console.log('doStar is being called');
    console.log(req.body);
    var fileName=req.body.fileName;
    var starVal = req.body.starVal;
    var glyphVal = req.body.glyphVal;
    var owner = req.body.owner;
    kafka.make_request('star_topic', {"name":fileName,"starVal":starVal, "glyphVal": glyphVal,"owner": owner}, function (err, results) {
        console.log('in result');
        console.log(results);
        console.log(results.value);
        console.log(results.value.starValue);
        if (err) {
            throw err;
            return;
        }
        else {
            if(results.value.starValue=== true){
                res.send({status:200,message:"Starred"});
                return;
            }
            else{
                res.send({status:204,message:"Star Removed"});
                return;
            }

        }
    });

});

router.post('/api/delete', function (req, res) {
    console.log('delete is being called');
    console.log(req.body);
    var fileName=req.body.fileName;
    var owner = req.body.owner;
    kafka.make_request('del_topic', {"name":fileName, "owner": owner}, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            throw err;
            return;
        }
        else {
            res.send({status:200,message:"Deleted"});
            return;
        }
    });

});

router.post('/shared', function (req, res) {
    console.log('getShared is being called');
    console.log(req.body);
    var owner=req.body.value;
    console.log(owner);
    kafka.make_request('listShared_topic', {"owner": owner}, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            throw err;
            return;
        }
        else {
            res.status(200).send(results.value);
        }
    });
});

module.exports = router;
