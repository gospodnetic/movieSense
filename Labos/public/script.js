
// Function saveData uses response objects obtained through API
// and sends them to server by HTTP requests in JSON format
function saveData(response){
	var test = JSON.stringify(response);
	console.log("stringify results follow");
	// console.log(test);
	
	var eventHandler = function () {
		console.log('eventHandler() -', Array.prototype.slice.call(arguments));
	};
	
	var xhr = new XMLHttpRequest();
	xhr.addEventListener("progress", eventHandler.bind(null, 'onProgress'));
	xhr.addEventListener("load", eventHandler.bind(null, 'onLoad'));
	xhr.addEventListener("error", eventHandler.bind(null, 'onError'));
	xhr.addEventListener("abort", eventHandler.bind(null, 'onAbort'));
	xhr.addEventListener("timeout", eventHandler.bind(null, 'onTimeout'));
	xhr.open("POST", "/data");
	xhr.timeout = 5000;
	xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	// send the collected data as JSON
	xhr.send(test);
}

function submitMovie() {
	var movie = {
		name: document.getElementById("movie-name").value
	}
	
	var eventHandler = function () {
		console.log('eventHandler() -', Array.prototype.slice.call(arguments));
	};
	
	var xhr = new XMLHttpRequest();
	xhr.addEventListener("progress", eventHandler.bind(null, 'onProgress'));
	xhr.addEventListener("load", eventHandler.bind(null, 'onLoad'));
	xhr.addEventListener("error", eventHandler.bind(null, 'onError'));
	xhr.addEventListener("abort", eventHandler.bind(null, 'onAbort'));
	xhr.addEventListener("timeout", eventHandler.bind(null, 'onTimeout'));
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			searchResult = xhr.responseText;
			console.log(JSON.parse(searchResult));
			writeMovieResults(JSON.parse(searchResult));
		}
	}
	xhr.open("POST", "/process_post");
	xhr.timeout = 5000;
	xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	// write collected movie_name
	console.log(JSON.stringify(movie));
	// send the collected data as JSON
	xhr.send(JSON.stringify(movie));
};

function writeMovieResults(result){
	// document.getElementById('movie-data').innerHTML = result;
	document.getElementById('movie-data').innerHTML = '<h2>OMDB results</h2>' + 
		'<p>Title:</p>' + 
		'<p>' + result.omdbResult.Title + '</p>' +
		'<p>Year:</p>' +
		'<p>' + result.omdbResult.Year + '</p>' +
		'<p>Runtime:</p>' +
		'<p>' + result.omdbResult.Runtime + '</p>' +
		'<p>Genre:</p>' +
		'<p>' + result.omdbResult.Genre + '</p>' +
		'<p>Director:</p>' +
		'<p>' + result.omdbResult.Director + '</p>' +
		'<p>Writer:</p>' +
		'<p>' + result.omdbResult.Writer + '</p>' +
		'<p>Actors:</p>' +
		'<p>' + result.omdbResult.Actors + '</p>' +
		'<p>Plot:</p>' +
		'<p>' + result.omdbResult.Plot + '</p>' +
		'<h2>Trailer</h2>' +
		result.trailerAddictResult.trailers.trailer[0].embed;
	// console.log(result.trailerAddictResult.trailers.trailer[0].cached);
}




