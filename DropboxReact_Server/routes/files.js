var express = require('express');
var router = express.Router();
var mysql = require('./mysql');
var multer = require('multer');
var glob = require('glob');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpeg')
    }
});

var upload = multer({storage:storage}).single('mypic');

/* GET users listing. */
router.post('/', function (req, res, next) {
    var resArr = [];
    console.log('get is being called');
    console.log(req.body);
    var owner=req.body.value;
    var getFile = "select * from file_info where owner ='"+ owner +"';";
    console.log(getFile);
    var resArr1 =[];
    mysql.fetchData(function(err,results){
        if(err){
            throw err;
            return;
        }
        else
        {
            console.log(results);
            console.log(results.length);
            var imgArr=[];
            for(var i=0; i< results.length;i++){
                var record={};
                record.path=results[i].path;
                record.fileType=results[i].fileType;
                record.owner=results[i].owner;
                record.fileName=results[i].fileName;
                record.fileID=results[i].fileid;
                if (record.fileType==='F') {
                    record.img = 'uploads/' + record.path.split('/')[2];
                    record.cols = 2;
                }

                imgArr.push(record);
            }
            console.log(imgArr);
            res.status(200).send(imgArr);
            return;

        }
    },getFile);
    //res.status(200).send(resArr1);

});



router.post('/upload', upload, function (req, res) {
    console.log('upload is being called');
    console.log(req.body);
    console.log(req.file);
    console.log(req.file.path);
    var path= req.file.path;
    var owner =req.body.owner;
    var insertFilePath= "insert into file_info (fileid, path, owner, fileType) values (DEFAULT ,'" + path + "','" + owner +"', 'F');";
    console.log(insertFilePath);
    mysql.insertData(function(err,results){
        if(err){
            throw err;
            return;
        }
        else {
            res.send({message:"File Uploaded!!"});
            return;

        }

    },insertFilePath);
    res.status(204);
});

router.post('/share', function (req, res) {
    console.log('share is being called');
    console.log(req.body.path);
    var path= req.body.path;
    var receiver ='fed@gmail.com';
    var shareFile= "insert into file_info (fileid, path, owner,fileType) values (DEFAULT ,'" + path + "','" + receiver +"', 'F');";
    console.log(shareFile);
    mysql.insertData(function(err,results){
        if(err){
            throw err;
            return;
        }
        else {
            res.send({message:"File Shared!!"});
            return;

        }

    },shareFile);
});

router.post('/createDir',upload, function (req, res) {
    console.log('createDir is being called');
    console.log(req.body);
    var owner=req.body.owner;
    var name=req.body.dirName;
    var createDir= "insert into file_info (fileid, path, owner, fileType, fileName) values (DEFAULT,'abcd','" + owner +"', 'D','"+ name +"');";
    console.log(createDir);
    mysql.insertData(function(err,results){
        if(err){
            console.log(err);
            throw err;
            return;
        }
        else {
            res.status(204).send({message:"Directory Created!!",
            fileType:'D'});
            return;

        }

    },createDir);
});

module.exports = router;
