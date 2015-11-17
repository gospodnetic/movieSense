
// Function saveData uses response objects obtained through API
// and sends them to server by HTTP requests in JSON format
function saveData(response){
	var test = JSON.stringify(response);
	console.log("stringify results follow");
	console.log(test);
	
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


