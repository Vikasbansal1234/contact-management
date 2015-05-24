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
        if(result){
            req.session.user=result;
            res.redirect('/welcome');
        }
        else{
            res.render('login',{error:"invalid credentials"});
        }
    }).on('ERROR',function(err){
        res.send({status:500,error:parseMongooseError(err),data:{}});
    })

}

exports.createUser=function(req,res) {
    var user={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    }
    userService.createUser(user).on('SUCCESS',function(result){
        req.session.user=result;
        res.redirect('/welcome')
    }).on('ERROR',function(error){
         res.render('login',{error:parseMongooseError(error)});
    })

}


exports.getUserById=function(req,res) {

    userService.getUserById(req.params.id).on('SUCCESS',function(result){
       res.send({status:200,error:null,data:result});

    }).on('ERROR',function(err){
        res.send({status:500,error:parseMongooseError(err),data:{}});
    })

}

exports.getCurrentUser=function(req,res){
    res.send({status:200,error:null,data:req.session.user});
}