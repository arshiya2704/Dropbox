

module.exports = function () {

    var api = {
        readImage : readImage,

    };


    var q = require('q');
    var fs = require('file-system');


    return api;


    function readImage (array) {
        var deferred = q.defer();

        array.forEach(function (obj,index,curArray) {

            fs.readFile('/Users/arshiya/WebstormProjects/kafka/uploads/'+obj.name,function (err, data){
                if(err){
                    console.log(err);
                    // obj.image =  "";
                    deferred.reject(err);
                }
                else{
                    obj.image = JSON.stringify(data);
                    if (index===array.length-1) {
                        deferred.resolve(curArray);
                    }


                }
            });


        });

        return deferred.promise;
    }
};