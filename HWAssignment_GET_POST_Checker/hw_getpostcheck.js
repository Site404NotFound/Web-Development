// Author: James Hippler (ONID# 932807333)
// Course: CS 290-400 Web Development
// Homework Assignment: GET and POST checker
// Due: Sunday, November 12, 2017

var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 7575);

//POST Check function
app.get('/', function(req,res){
  // Call sendParameters function to render the reponse to the HTML page
  sendParameters(grabParameters(req.query), res, 'GET');
  // Send function the return value from grabParameters function, the Express response, and the formType
});

//POST Check function
app.post('/', function(req,res){
  // Call sendParameters function to render the reponse to the HTML page
  sendParameters(grabParameters(req.body), res, 'POST');
  // Send function the return value from grabParameters function, the Express response, and the formType
});


// GET & POST handlers basically did the same thing.
// Made functions to DRY up code (and diversify from the lecture notes)
// Admittedly, the below section is still similar to lecture notes, but I couldn't figure out how to change any further without breaking
function grabParameters(params) {
  var formParams = [];
    for (var p in params){
      formParams.push({'name':p,'value':params[p]});
    }
    return formParams;
}

function sendParameters(params, res, formType) {
    var context = {};
    context.dataList = params;
    context.reqType = formType;
    res.render('getpostcheck', context);
}

// 404 Page not found error handler
app.use(function(req,res){
 res.status(404);
 res.render('404');
});

// 500 Server Error handler
app.use(function(err, req, res, next){
 console.error(err.stack);
 res.type('plain/text');
 res.status(500);
 res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port'));
});
