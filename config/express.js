var express = require('express')

module.exports = function (app, config){
	app.configure(function(){
	  app.set('views', config.root + '/views');
	  app.set('view engine', 'jade');
	  app.set('view options', {
	    layout: false
	  });
	  app.use(express.bodyParser());
	  app.use(express.methodOverride());
	  app.use(express.static(config.root + '/public'));
	  app.use(app.router);
	});

	app.configure('development', function(){
	  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	});

	app.configure('production', function(){
	  app.use(express.errorHandler());
	});
	
}
