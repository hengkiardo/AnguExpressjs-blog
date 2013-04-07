
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    _ = require("underscore"),
    api = require('./routes/api');

var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]    

var app = module.exports = express();

var mysql = require('mysql');

var database = 'blogposts';
var client = mysql.createConnection({
              user: 'root',
              password: '',
              host: 'localhost',
              port: '3306',
              database: 'blogposts'
            });

client.connect();



// Configuration
require('./config/express')(app,config);

// Routes

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);


//JSON API
/**** JSON API ****/

// GET ALL

app.get('/api/posts', function (req, res) {

     client.query('SELECT * FROM posts',
        function (err, results, fields) {
            if (err) {
                res.send(err);
            }
            console.log(results);
            res.json(results);
        }
    );
});

// GET

app.get('/api/posts/:pid', function (req, res) {

  var pid = req.params.pid;

  client.query('SELECT * FROM posts WHERE id = ?', [pid],
  function (err, results, fields) {
    if (err) {
      res.send(err);
    }
    console.log("--- Specific Post ---");
    console.log(results);
    
    res.json(_.first(results));
           
    }
  );
});

// POST

app.post('/api/post', function(req, res) {

  var ptitle = req.body.title;
  var pposts = req.body.posts;
  client.query('INSERT INTO posts SET title = ?, posts = ?', [ptitle, pposts]);
    res.send(req.body);
});

// PUT

app.put('/api/posts/:pid', function(req, res) {

  var ptitle = req.body.title;
  var pposts = req.body.posts;
  var pid = req.params.pid;

  client.query('UPDATE posts SET title = ?, posts = ? WHERE id = ?', [ptitle, pposts, pid],
  function (err, results, fields) {
    if (err) {
      res.send(err);
    }
    //console.log(results);
    //res.json(results);
    //req.body = results;
    
    res.send(req.body);
    
    }
  );
});

// DELETE

app.delete('/api/posts/:pid', function (req, res) {

  var pid = req.params.pid;
  client.query('DELETE FROM posts WHERE id = ?', [pid],
  function (err, results, fields) {
    if (err) {
      res.send(err);
    } else {
      console.log(results.affectedRows);
    }
  });
});


// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server

app.listen(4000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
