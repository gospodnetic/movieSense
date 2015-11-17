var express = require('express');
var app = express();
app.use(express.static('public'));
var bodyParser = require('body-parser');
var http = require('http');

// parsers for incoming http requests
var urlencodedParser = bodyParser.urlencoded({extended: false});
var jsonParser = bodyParser.json();

app.get("/", function(req,res){
	res.sendFile(__dirname + '/' + 'index.html');
});

app.post("/data", jsonParser, function(req,res){
	// console.log(req.body);
	res.status(200).end();
});

app.post("/process_post", jsonParser , function(req,res){
	
	console.log("stigao sam");
	console.log("Ime trazenog filma je " + req.body.name);
	searchOMDB(req.body.name);
	// res.sendFile(__dirname + '/' + 'index.html');
	res.end();
});

function searchOMDB(movie_name){
	var urified = encodeURI('/?t=' + movie_name + '&y=&plot=short&r=json');
	console.log(urified);
	
	var options = {
		host: 'www.omdbapi.com',
		path: urified
	};
	
	console.log(options);
	
	var result;
	
	callback = function(response) {
		var str = '';
		
		//another chunk of data has been recieved, so append it to `str`
		response.on('data', function (chunk) {
			str += chunk;
		});
		
		//the whole response has been recieved, so we just print it out here
		response.on('end', function () {
			console.log(str);
			result = str;
		});
		
		return str;
		
	}
	http.request(options, callback).end();
	
}

var server = app.listen(8081, function(){
	var host = server.address().address;
	var port = server.address().port;
	
	console.log("App listening at http://%s:%s", host, port)
});