
var userController=require('../controller/UserController');
var contactController=require('../controller/ContactController');
var readDirFiles=require('../Utils/ReadDirFiles.js');

module.exports=function(app){

    app.get('/',function(req,res){
        var files=readDirFiles(__dirname+"/../public");
        res.render('login',{cache:files,error:"No error message"});
    })

    app.get('/logout',function(req,res){
        req.session.destroy();
        res.redirect('/');
    })
    app.get('/welcome',function(req,res){
        res.render('index');
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

    app.get('/currentuser',userController.getCurrentUser);
}
