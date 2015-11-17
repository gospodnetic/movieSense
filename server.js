var express = require('express');
var app = express();
app.use(express.static('public'));
var bodyParser = require('body-parser');

app.get("/", function(req,res){
	res.sendFile(__dirname + '/' + 'index.html');
});

app.use(bodyParser.json());

app.post("/data", function(req,res){
	console.log(req.body);
	console.log(req.body.friends.data);
	res.status(305).end();
});

var server = app.listen(8081, function(){
	var host = server.address().address;
	var port = server.address().port;
	
	console.log("App listening at http://%s:%s", host, port)
});