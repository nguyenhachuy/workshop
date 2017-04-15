var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

var app = express();

// Create the database
var PouchDB = require('pouchdb');
var db = new PouchDB('workshop');


// =========================
// App Configs
// =========================
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.disable('x-powered-by');
// Allowing CORS
app.use(function(req,res,next) {
	res.append('Access-Control-Allow-Origin', req.headers.origin || '*');
	res.append('Access-Control-Allow-Credentials', 'true');
	res.append('Access-Control-Allow-Methods', ['GET', 'OPTIONS', 'PUT', 'POST', 'DELETE']);
	res.append('Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept');
	next();
});
app.enable('trust proxy');


// =======================================================================
// RESTful Routes
// HTTP Verbs: GET, POST, PUT, DELETE
//
// Name     |   Path      |   HTTP Verb |   Purpose
// =======================================================================
// Index    |   /         |   GET       | List all the posts
// Create   |   /         |   POST      | Create a new post
// Show     |   /:id      |   GET       | Show a single post
// Update   |   /:id      |   PUT       | Update a particular post
// Delete   |   /:id      |   DELETE    | Delete a particular post
// =======================================================================
app.get('/posts', function(request, response){
	db.allDocs({
		include_docs:true,
		attachments:true
	}, function(err, result) {
		if(err){
			response.sendStatus(400);
		}
		else{
			response.status(200).json(result);
		}
	
	});
});
app.delete('post/:id', function(req, res){
	db.get(req.params.id, function(err, found){
		if(err){
			res.sendStatus(400);
		}
		else{
			db.remove(found, function(err, removed){
				if(err){
					res.sendStatus(400);
				}
				else{
					res.sendStatus(202);
				}
			});
		}

	});
});
app.post('/posts', function(request, response){
	var post = {
		title: request.body.title,
		post: request.body.post
	};
	db.post(post, function(err, created){
		if(err){
			response.sendStatus(400);
		}
		else{
			response.status(201).json(created);
		}

	});
});
app.listen('3000', function(){
	console.log('LMAO');

});