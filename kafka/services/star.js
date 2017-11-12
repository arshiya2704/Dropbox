var mongoose = require('./mongoose');
var moment = require('moment');

function handle_request5(msg, callback){
    var res = {};
    var res1={};
    console.log("In handle star request:"+ JSON.stringify(msg));
    var query = {'name':msg.name, 'owner': msg.owner};
    var newStarVal = !(msg.starVal);
    var newGlyphVal;
    var action;
    if(msg.glyphVal === 'glyphicon glyphicon-star-empty'){
         newGlyphVal ='glyphicon glyphicon-star';
          action = 'marked'   ;
    }
    else{
        newGlyphVal ='glyphicon glyphicon-star-empty';
        action = 'unmarked'   ;
    }

    console.log(newStarVal);
    console.log(newGlyphVal);
    mongoose.FileData.findOneAndUpdate(query, {starVal: newStarVal, glyphVal: newGlyphVal}, {upsert:true}, function(err, user,info){
        if (err) {
            console.log(err);
        }
        else{
            var history = mongoose.TransactionData();
            history.owner = msg.owner;
            history.action = msg.owner + " " + action + " " + msg.name + " as a favourite at " + moment().format('MMMM Do YYYY, h:mm:ss a');
            history.save(function (err1, savedFile1) {
                if(err1)
                {
                    console.log(err);
                }
                else{
                    console.log("Transaction Updated");
                    res1.code="200";
                }
                callback(null,res1);
            });
            res.code="200";
            res.value= {starValue:newStarVal,glphValue:newGlyphVal};
        }

        callback(null,res);
    });
}

exports.handle_request5 = handle_request5;