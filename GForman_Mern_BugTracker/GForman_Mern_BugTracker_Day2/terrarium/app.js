
var express = require("express");
var app = express();
var mongoose = require('mongoose');

const bodyParser = require('body-parser');
const routes = require('./routes/api');



//Database connection
var mongoDB = 'mongodb://localhost:27017/terrarium';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

//parsers to allow for sending information to and from mongoose
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/api', routes);


app.use(function(err, req, res, next){
	res.status(422).send({error: err.message});
})

//Define a static folder for public file access
app.use(express.static('public'));

/*Use a wildcard on redirect so all paths chosen direct back to the index page
index will contain the single page react app, so app will load regardless of patah entered
as path will still remain as the url, allows direct linking to individual elements within singlepage app via URLS */
app.get ('/*', function(req,res){
	res.sendFile(__dirname + "/public/index.html");
})


//initialise the server
var server = app.listen(12071,function(){
	var host = server.address().address;
	var port = server.address().port;
	
	console.log("server running on 12071");
})

