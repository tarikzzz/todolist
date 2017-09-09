var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');

app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public'));
app.use('/api',appRoutes);

//'mongodb://localhost:27017/project'
//mongodb://<dbuser>:<dbpassword>@ds131384.mlab.com:31384/heroku_rwqvsl1q
mongoose.connect('mongodb://<admin>:<admin>@ds131384.mlab.com:31384/heroku_rwqvsl1q', function(err){
	if(err){
		console.log('Not connected to the database!!! ' + err);
		} else {
			console.log('Successfully connected to MongoDB');
		}
});

app.get('*', function(req,res){
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen (port, function(){
	console.log('Running the server on port ' + port);
});


