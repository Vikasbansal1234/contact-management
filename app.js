var express = require('express');
var http = require('http');
var path = require('path');
var Utils=require('./config/Utils');
var app = express();
var config=require('./config/Config.json');
var MongoStore=require('connect-mongo')(express);

// all environments;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('Sek7et'));
app.use(express.session({store:new MongoStore({
    db:config.mongostore.db,
    host:config.mongostore.host,
    port:config.mongostore.port
})}));

app.use(function(req,res,next){
    var url=req.url;
    console.log('custom url >> ',url);
    if(url==='/' || url==='/login' || url==='/signup' || (url!=='/'  && url!=='/login' && url!=='/singup' && req.session.user)){
        next();
    }
    else{
        res.redirect('/');
    }
})

app.use(app.router);


var urlMappings=require('./config/URLMappings')(app);
var MongoDatabaseProvider=require('./config/MongoDatabaseProvider');
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
MongoDatabaseProvider.initMongoose(function(){

    http.createServer(app).listen(process.env.PORT || config.port, function(){
        console.log('Express server listening on port ' + config.port);
    });
})
