
var userController=require('../controller/UserController');
var contactController=require('../controller/ContactController');
var fs=require('fs');

module.exports=function(app){
    console.log('><><><><><><><><><>');
    app.get('/',function(req,res){
        var fs=require('fs');
        function getFiles (dir, files_){
            files_ = files_ || {};
            var files = fs.readdirSync(dir);
            for (var i in files){
                var filename=files[i];
                var name = dir + '/' + files[i];
                var fsStat=fs.statSync(name);

                if (fsStat.isDirectory()){
                    getFiles(name, files_);
                } else {
                    files_[filename]=fsStat.mtime.getTime();
                }
            }
            return files_;
        }
        var files=getFiles(__dirname+"/../public");
        console.log(files);
        res.render('index',{cache:files});
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