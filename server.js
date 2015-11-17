var express = require('express');
var app = express();
app.use(express.static('public'));
var bodyParser = require('body-parser');

// parsers for incoming http requests
var urlencodedParser = bodyParser.urlencoded({extended: false});
var jsonParser = bodyParser.json();

app.get("/", function(req,res){
	res.sendFile(__dirname + '/' + 'index.html');
});

app.post("/data", jsonParser, function(req,res){
	console.log(req.body);
	res.status(200).end();
});

var server = app.listen(8081, function(){
	var host = server.address().address;
	var port = server.address().port;
	
	console.log("App listening at http://%s:%s", host, port)
});