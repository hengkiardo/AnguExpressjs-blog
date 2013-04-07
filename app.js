
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

// Configuration

require('./config/express')(app,config);

// Routes

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);


//JSON API
app.get('/api/posts', api.posts);

app.get('/api/post/:id', api.post);
app.post('/api/post', api.addPost);
app.put('/api/post/:id', api.editPost);
app.delete('/api/post/:id', api.deletePost);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server

app.listen(4000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
