var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;


//mongoose.connect('mongodb://localhost/employees');
mongoose.connect('mongodb://heroku_rwqvsl1q:3c6c0tnj26mf972484cgrnq53k@ds131384.mlab.com:31384/heroku_rwqvsl1q', function(err){
	if(err){
		console.log('Not connected to the database!!! ' + err);
		} else {
			console.log('Successfully connected to MongoDB');
		}
});

var Employee = mongoose.model('Employee', mongoose.Schema({
	name:String,
	dept:String,
	area:String,
	status:String,
	contact:String,
	salary:String
}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));

app.get('/api/employees', function(req, res){
	Employee.find(function(err, employees){
		if(err)
			res.send(err);
		res.json(employees);
	});
});

app.get('/api/employees/:id', function(req, res){
	Employee.findOne({_id:req.params.id}, function(err, employee){
		if(err)
			res.send(err);
		res.json(employee);
	});
});
app.post('/api/employees', function(req, res){
	Employee.create( req.body, function(err, employees){
		if(err)
			res.send(err);
		res.json(employees);
	});
});

app.delete('/api/employees/:id', function(req, res){
	Employee.findOneAndRemove({_id:req.params.id}, function(err, employee){
		if(err)
			res.send(err);
		res.json(employee);
	});
});
app.put('/api/employees/:id', function(req, res){
	var query = {
		name:req.body.name,
		dept:req.body.dept,
		area:req.body.area,
		status:req.body.status,
		contact:req.body.contact,
		salary:req.body.salary
	};
	Employee.findOneAndUpdate({_id:req.params.id}, query, function(err, employee){
		if(err)
			res.send(err);
		res.json(employee);
	});
});
app.listen(PORT, function(){
	console.log('server is running on port 3000..');
});