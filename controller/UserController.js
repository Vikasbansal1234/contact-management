/**
 * Created by aethons on 29/4/15.
 */
var userService=require('../service/UserService');
var parseMongooseError=require('../Utils/ParseMongooseError');

exports.getAllUsers=function(req,res) {
     userService.getAllUsers().on('SUCCESS',function(result){
         res.send({status:200,error:null,data:result});
     }).on('ERROR',function(err){
         res.send({status:500,error:parseMongooseError(err),data:{}});
     })

}

exports.updateUser=function(req,res) {
    var user=req.body;
    user.modified_on=new Date();
    var userId=req.params.id;
    userService.updateUser(user,userId).on('SUCCESS',function(result){
        res.send({status:200,error:null,data:result});
    }).on('ERROR',function(err){
        res.send({status:500,error:parseMongooseError(err),data:{}});
    })

}

exports.getUserByNameAndPassword=function(req,res) {

    userService.getUserByNameAndPassword(req.body.username,req.body.password).on('SUCCESS',function(result){

        if(result)
          res.send({status:200,error:null,data:result});
        else
          res.send({status:500,error:'invalid credentials',data:null});
    }).on('ERROR',function(err){
        res.send({status:500,error:parseMongooseError(err),data:{}});
    })

}

exports.createUser=function(req,res) {
    userService.createUser(req.body).on('SUCCESS',function(result){
        res.send({status:200,error:null,data:result});
    }).on('ERROR',function(error){
        res.send({status:500,error:parseMongooseError(error),data:{}});
    })

}


exports.getUserById=function(req,res) {

    userService.getUserById(req.params.id).on('SUCCESS',function(result){
       res.send({status:200,error:null,data:result});

    }).on('ERROR',function(err){
        res.send({status:500,error:parseMongooseError(err),data:{}});
    })

}