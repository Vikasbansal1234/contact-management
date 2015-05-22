
var userController=require('../controller/UserController');
var contactController=require('../controller/ContactController');

module.exports=function(app){

    app.get('/',function(req,res){
        console.log('request received');
        res.redirect('/index.html');
    })
    app.get('/logout',function(req,res){
        res.redirect('/index.html');
    })

    app.get('/contact/:id',contactController.getContactById);
    app.get('/contact',contactController.getAllContact);
    app.put('/contact/:id',contactController.updateContact);
    app.post('/contact',contactController.createContact);
    app.delete('/contact/:id',contactController.deleteContactById);


    app.get('/user',userController.getAllUsers);
    app.get('/user/:id',userController.getUserById)
    app.put('/user/:id',userController.updateUser);
    app.post('/login',userController.getUserByNameAndPassword);
    app.post('/signup',userController.createUser);
}