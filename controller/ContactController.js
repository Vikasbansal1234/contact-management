/**
 * Created by aethons on 29/4/15.
 */


var contactService=require('../service/ContactService');

var parseMongooseError=require('../Utils/ParseMongooseError');

exports.getContactById=function(req,res){
    var contactId=req.params.id;
    contactService.getContactById(contactId).on('SUCCESS',function(result){
        res.send({status:200,error:null,data:result});
    }).on('ERROR',function(err){
        res.send({status:500,error:parseMongooseError(err),data:{}});
    })
}

exports.getAllContact=function(req,res){
    var userId=req.query.user_id;
    contactService.getAllContact(userId).on('SUCCESS',function(result){
        res.send({status:200,error:null,data:result});
    }).on('ERROR',function(err){
        res.send({status:500,error:parseMongooseError(err),data:{}});
    })
}

exports.updateContact=function(req,res){
    var contact=req.body;
    var userId=req.query.user_id;
    contact.modified_on=new Date();
    contactService.updateContact(contact,userId).on('SUCCESS',function(result){
        res.send({status:200,error:null,data:result});
    }).on('ERROR',function(err){
        res.send({status:500,error:parseMongooseError(err),data:{}});
    })
}

exports.deleteContactById=function(req,res){
    var userId=req.query.user_id;
    var contactId=req.params.id;
    contactService.deleteContactById(contactId,userId).on('SUCCESS',function(result){
        res.send({status:200,error:null,data:result});
    }).on('ERROR',function(err){
        res.send({status:500,error:parseMongooseError(err),data:{}});
    })
}

exports.createContact=function(req,res){
    var contact=req.body;
    if(!req.body.user_id)
        res.send({status:500,error:'user_id is required ',data:{}});
    else
    contactService.createContact(contact,req.body.user_id).on('SUCCESS',function(result){
        res.send({status:200,error:null,data:result});
    }).on('ERROR',function(err){
        res.send({status:500,error:parseMongooseError(err),data:{}});
    })

}

