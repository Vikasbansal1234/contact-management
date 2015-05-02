/**
 * Created by intelligrape on 29/4/15.
 */
var mongoose=require('mongoose');
var config=require('./Config.json');
function initMongoose(callback){
    mongoose.connect(config.mongo.uri);
    mongoose.connection.on('connected',function(){
        console.log('connected');
    })
    mongoose.connection.on("disconnected",function(){
         console.log('disconnected');
    })
    mongoose.connection.on("error",function(){
        console.log('error');
    });
    mongoose.connection.on('open',function(){
         console.log('open');
         callback();
    })
}

exports.initMongoose=function(callback){
    initMongoose(callback);
}