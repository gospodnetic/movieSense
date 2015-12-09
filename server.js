var express = require('express');
var app = express();
app.use(express.static('public'));
var bodyParser = require('body-parser');
var http = require('http');
var parseString = require('xml2js').parseString;

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/movieSense';

// parsers for incoming http requests
var urlencodedParser = bodyParser.urlencoded({extended: false});
var jsonParser = bodyParser.json();

app.get("/", function(req,res){
	res.sendFile(__dirname + '/' + 'index.html');
});

app.post("/data", jsonParser, function (req, res) {
	console.log(req.body.id);
	console.log(' ');
	MongoClient.connect(url, function(err, db){
		if(err){
			return console.dir(err);
		}
		
		db.collection('FBprofile').insertOne({"a": "1"});
		// assert.equal(null, err);
		storeFBdata(db, req, function() {
			db.close();
		});
	});
	res.status(200).end();
});

app.post("/process_post", jsonParser, function (req, res) {
	
	console.log("stigao sam");
	console.log("Ime trazenog filma je " + req.body.name);
	
	var trailerAddictResult;
	var omdbResult;
	
	var searchCompletedCount = 0;
	
	searchOMDB(req.body.name, function (result) {
		omdbResult = JSON.parse(result);
		console.log("OMDB:\n" + omdbResult);
		searchCompleted();
	});
	
	searchTrailerAddict(req.body.name, function (result) {
		// console.log(result);
		parseString(result, function (err, jsonResult) {
			trailerAddictResult = err ? 'this XML is baaaad!' : jsonResult;
		});
		console.log("Trailer Addict:\n", trailerAddictResult);
		searchCompleted();
	});
	
	function searchCompleted() {
		console.log('zzz: search completed ' + (searchCompletedCount + 1));
		if (++searchCompletedCount < 2)
		return;
		var data = {
			trailerAddictResult: trailerAddictResult,
			omdbResult: omdbResult
		};
		// console.log('zzz: sending response:', data);
		res
		.status(200)
		.type('json')
		.json(data)
		.end()
		;
	}
});

//movie APIs functions

function search(options, callback) {
	console.log(options);
	http.request(options, function (response) {
		var result = '';
		
		//another chunk of data has been recieved, so append it to `str`
		response.on('data', function (chunk) {
			result += chunk;
		});
		
		//the whole response has been recieved, so we just print it out here
		response.on('end', function () {
			// console.log(result);
			callback(result);
		});
	}).end();
}

function searchOMDB(movie_name, callback) {
	var options = {
		host: 'www.omdbapi.com',
		path: encodeURI('/?t=' + movie_name + '&y=&plot=short&r=json')
	};
	search(options, callback);
}

function searchTrailerAddict(movie_name, callback) {
	var options = {
		host: 'api.traileraddict.com',
		path: encodeURI('/?film=' + movie_name)
	};
	search(options, callback);
}

// save Fb login data functions

function storeFBdata(db, data, callback){
	db.collection('FBprofile').insertOne(data.body, function(err, result) {
		assert.equal(err, null);
		console.log("Inserted a document into FBprofile collection.");
		callback(result);
	});
};

// server
var server = app.listen(8081, function(){
	var host = server.address().address;
	var port = server.address().port;
	
	console.log("App listening at http://%s:%s", host, port)
});