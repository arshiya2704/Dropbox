var mongoose = require('mongoose');
mongoose.connect('localhost:27017/dropbox');
var Schema = mongoose.Schema;

var userDataSchema = new Schema({
    fname   : String,
    lname   : String,
    email   : {type : String, unique: true},
    pwd     : String,
    work    : String,
    edu     : String,
    interest: String
});

var fileDataSchema = new Schema({
    path    : String,
    owner   : String,
    name    : String,
    type    : String,
    fileType : String,
    starVal     : Boolean,
    glyphVal : String,
    parent : String

});

var transactionDataSchema = new Schema({
    owner : String,
    action : String,
    time : Date
});

fileDataSchema.index({ "owner": 1, "name": 1, "parent":1}, { "unique": true });

module.exports.UserData = mongoose.model('UserData', userDataSchema);
module.exports.FileData = mongoose.model('FileData', fileDataSchema);
module.exports.TransactionData = mongoose.model('TransactionData', transactionDataSchema);


