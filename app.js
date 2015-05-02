
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var Utils=require('./config/Utils');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
/*
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
*/
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));



var urlMappings=require('./config/URLMappings')(app);
var MongoDatabaseProvider=require('./config/MongoDatabaseProvider');
var config=require('./config/Config.json');
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
MongoDatabaseProvider.initMongoose(function(){

    http.createServer(app).listen(config.port, function(){
        console.log('Express server listening on port ' + config.port);
    });
})
