/**
 * Created by aethons on 29/4/15.
 */
var Contact=require('../domain/Contact');
var User=require('../domain/User');

exports.getContactById=function(contactId){
    var emitter=this;
    Contact.findById(contactId,function(err,result){
        if(err)
         emitter.emit('ERROR',err);
        else
         emitter.emit('SUCCESS',result);
    })

}.toEmitter();


exports.getAllContact=function(userId){
    var emitter=this;
    Contact.find({user_id:userId},function(err,result){
        if(err)
            emitter.emit('ERROR',err);
        else
            emitter.emit('SUCCESS',result);
    })
}.toEmitter();


exports.deleteContactById=function(contactId,userId){
    var emitter=this;
    User.findById(userId,function(err,result){
        if(err)
        emitter.emit('ERROR',err);
        else{
            if(result && result.delete){
                Contact.findByIdAndRemove(contactId,function(err,result){
                    if(err)
                     emitter.emit('ERROR',err);
                    else
                     emitter.emit('SUCCESS',result);
                })
            }
            else
            emitter.emit('ERROR','You dont have permission to delete it');
        }
    })

}.toEmitter();


exports.createContact=function(contact,userId){
    var emitter=this;
    contact.user_id=userId;
    User.findById(userId,function(err,result){
        if(err)
            emitter.emit('ERROR',err);
        else{
            if(result && result.create){
                Contact.create(contact,function(err,result){
                    if(err)
                        emitter.emit('ERROR',err);
                    else
                        emitter.emit('SUCCESS',result);
                })
            }
            else
                emitter.emit('ERROR','You dont have permission to Create it');
        }
    })


}.toEmitter();



exports.updateContact=function(contact,userId){
    var emitter=this;
    User.findById(userId,function(err,result){
        if(err)
            emitter.emit('ERROR',err);
        else{
            if(result && result.update){
                Contact.update({_id:contact._id},contact,function(err,result){
                    if(err)
                        emitter.emit('ERROR',err);
                    else
                        emitter.emit('SUCCESS',result);
                })
            }
            else
                emitter.emit('ERROR','You dont have permission to update it');
        }
    })


}.toEmitter();