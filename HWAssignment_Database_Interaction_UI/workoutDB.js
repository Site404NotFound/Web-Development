
// Below code segments were obtained from the Week 7 Lecture Content
var mysql = require('./dbcon.js');
var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended:true}));
app.set('port', 3739);                                  // Using port 3739 for my flip3 address
app.use(express.static('views'));
app.set('mysql', mysql);

app.get('/', function(req, res){
  var context = {};
  callbackCount = 0;
  var mysql = req.app.get('mysql');
  selectWorkouts(req, res, mysql, context, complete);
  function complete(){
      callbackCount++;
      if(callbackCount >= 1){
        console.log(context);
          res.render('workoutDB', context);
      }
  }
});

app.get('/workoutinsert', function(req, res){
  console.log("Entered workoutinsert route");
    var mysql = req.app.get('mysql');
    var sql = 'INSERT INTO workouts (name, reps, weight, date, lbs) VALUES (?, ?, ?, ?, ?)';
    var inserts = [req.query.workout_name, req.query.reps, req.query.weight, req.query.date, req.query.units];
    sql = mysql.pool.query(sql,inserts,function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }else{
          res.redirect('/');
        }
    });
});

app.get('/workoutdelete:id', function(req, res){
  console.log("Entered workoutdelete route");
  callbackCount = 0;
  var mysql = req.app.get('mysql');
  deleteWorkout(req, res, mysql, complete);
  function complete(){
      callbackCount++;
      if(callbackCount >= 1){
          res.redirect('/');
      }
  }
});

app.get('/workouts:id', function(req, res){
  var context = {};
  var sql = 'SELECT id, name, reps, weight, DATE_FORMAT(date, "%Y-%m-%d") AS date, lbs FROM workouts WHERE id = ?;';
  var trim = req.params.id.replace(/(^:)|(,$)/g, "")   // Remove leading ':' from eid parameter (https://stackoverflow.com/questions/661305/how-can-i-trim-the-leading-and-trailing-comma-in-javascript)
  var inserts = [trim];
  console.log(trim);
  mysql.pool.query(sql, inserts, function(err, rows, fields){

  if(err){
      next(err);
      return;
    }
      context.workouts = rows;
      console.log(rows);
      res.render('update_workouts', context);
  });
});

app.get('/updateworkouts:id', function(req, res){
  callbackCount = 0;
  var mysql = req.app.get('mysql');
  updateWorkouts(req, res, mysql, complete);
  function complete(){
      callbackCount++;
      if(callbackCount >= 1){
          res.redirect('/');
      }
  }
});

app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){ //replace your connection pool with the your variable containing the connection pool
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    mysql.pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('workoutDB',context);
    })
  });
});

function selectWorkouts(req, res, mysql, context, complete) {
  sql = mysql.pool.query('SELECT id, name, reps, weight, DATE_FORMAT(date, "%Y-%m-%d") AS date, lbs FROM workouts;', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
      context.workouts = rows;
      console.log(rows);
      complete();
  });
}

function deleteWorkout(req, res, mysql, complete) {
  console.log("Entered deleteWorkout Function");
  console.log(req.params.id);
  var sql = 'DELETE FROM `workouts` WHERE id = ?';
  var trim = req.params.id.replace(/(^:)|(,$)/g, "");   // Remove leading ':' from eid parameter (https://stackoverflow.com/questions/661305/how-can-i-trim-the-leading-and-trailing-comma-in-javascript)
  var inserts = [trim];
  sql = mysql.pool.query(sql,inserts,function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      complete();
  });
}

function updateWorkouts(req, res, mysql, complete){
  var sql = "UPDATE `workouts` SET `name` = ?, `reps` = ?, `weight` = ?, `date` = ?, `lbs` = ? WHERE id = ?";
  var trim = req.params.id.replace(/(^:)|(,$)/g, "");
  var inserts = [req.query.workout_name, req.query.reps, req.query.weight, req.query.date, req.query.units, trim];
  console.log(inserts);
  sql = mysql.pool.query(sql,inserts,function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      complete();
  });
}


// Below code segments were obtained from the Week 7 Lecture Content
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
