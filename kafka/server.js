var connection =  new require('./kafka/Connection');
var login = require('./services/login');
var register = require('./services/register');
var files = require('./services/files');
var list = require('./services/list');
var directory = require('./services/directory');
var star = require('./services/star');
var del = require('./services/del');
var share = require('./services/share');
var update = require('./services/update');
var logs = require('./services/logs');

var topic_name = 'login_topic';
var topic_name1 = 'register_topic';
var topic_name2 = 'upload_topic';
var topic_name3 = 'list_topic';
var topic_name4 = 'createDir_topic';
var topic_name5 = 'star_topic';
var topic_name6 = 'del_topic';
var topic_name7 = 'share_topic';
var topic_name8 = 'update_topic';
var topic_name9 = 'logs_topic';
var consumer = connection.getConsumer(topic_name);
var consumer1 = connection.getConsumer(topic_name1);
var consumer2 = connection.getConsumer(topic_name2);
var consumer3 = connection.getConsumer(topic_name3);
var consumer4 = connection.getConsumer(topic_name4);
var consumer5 = connection.getConsumer(topic_name5);
var consumer6 = connection.getConsumer(topic_name6);
var consumer7 = connection.getConsumer(topic_name7);
var consumer8 = connection.getConsumer(topic_name8);
var consumer9 = connection.getConsumer(topic_name9);
var producer = connection.getProducer();

console.log('server is running');
consumer.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    login.handle_request(data.data, function(err,res){
        console.log('after handle'+res.code);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log("Data"+data);
        });
        return;
    });
});

consumer1.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    register.handle_request1(data.data, function(err,res){
        console.log('after handle'+res.code);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log("Data"+data);
        });
        return;
    });
});

consumer2.on('message', function (message) {
    console.log('message received');
    //console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    files.handle_request2(data.data, function(err,res){
        console.log('after handle'+res.code);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log("Data"+data);
        });
        return;
    });
});

consumer3.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    list.handle_request3(data.data, function(err,res){
        console.log('after handle'+res.code);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log("Data"+data);
        });
        return;
    });
});

consumer4.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    directory.handle_request4(data.data, function(err,res){
        console.log('after handle'+res.code);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log("Data"+data);
        });
        return;
    });
});

consumer5.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    star.handle_request5(data.data, function(err,res){
        console.log('after handle'+res.code);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log("Data"+data);
        });
        return;
    });
});

consumer6.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    del.handle_request6(data.data, function(err,res){
        console.log('after handle'+res.code);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log("Data"+data);
        });
        return;
    });
});

consumer7.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    share.handle_request7(data.data, function(err,res){
        console.log('after handle'+res.code);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log("Data"+data);
        });
        return;
    });
});

consumer8.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    update.handle_request8(data.data, function(err,res){
        console.log('after handle'+res.code);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log("Data"+data);
        });
        return;
    });
});

consumer9.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    logs.handle_request9(data.data, function(err,res){
        console.log('after handle'+res.code);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log("Data"+data);
        });
        return;
    });
});