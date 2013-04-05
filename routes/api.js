/*
 * Serve JSON to our AngularJS client
 */
/**** JSON API ****/

// GET ALL

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

exports.posts = function (req, res) {

     client.query('SELECT * FROM posts',
        function (err, results, fields) {
            if (err) {
                res.send(err);
            }
            console.log(results);
            res.json(results);
        }
    );
};

// GET

exports.post = function (req, res) {

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
};

// POST

exports.addPost = function(req, res) {

  var ptitle = req.body.title;
  var pposts = req.body.posts;
  client.query('INSERT INTO posts SET title = ?, posts = ?', [ptitle, pposts]);
    res.send(req.body);
};

// PUT

exports.editPost = function(req, res) {

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
};

// DELETE

exports.deletePost = function (req, res) {

  var pid = req.params.pid;
  client.query('DELETE FROM posts WHERE id = ?', [pid],
  function (err, results, fields) {
    if (err) {
      res.send(err);
    } else {
      console.log(results.affectedRows);
    }
  });
};