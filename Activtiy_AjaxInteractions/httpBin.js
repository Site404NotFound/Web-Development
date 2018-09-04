// Author: James Hippler (ONID# 932807333)
// Course: CS 290-400 Web Development
// Activity: Ajax Interactions
// Due: Sunday, November 05, 2017

document.addEventListener('DOMContentLoaded', httpBinCall);

function httpBinCall(){
	document.getElementById('httpBinSubmit').addEventListener('click', function(event){
	    var req = new XMLHttpRequest();
	    var payload = {
				inputText:null
			};
	    payload.inputText = document.getElementById('httpBin').value;
	    req.open('POST', 'https://httpbin.org/post', true);
	    req.setRequestHeader('Content-Type', 'application/json');
	    req.addEventListener('load',function(){
	      if(req.status >= 200 && req.status < 400){
	        var response = JSON.parse(req.responseText);
					document.getElementById('httpDisplay').textContent = 'HTTP Bin Response:';
					document.getElementById('httpBinIn1').textContent = 'Text Input: ';
					document.getElementById('httpBinIn2').textContent = payload.inputText;
	        document.getElementById('httpBinOut1').textContent = 'HTTPBin Output: ';
	        document.getElementById('httpBinOut2').textContent = response.data;
	      } else {
	        console.log('Error in network request: ' + req.statusText);
	      }});
	    req.send(JSON.stringify(payload));
	    event.preventDefault();
	  });
}

// {
// "args": {},
// "data": "Some Text",
// "files": {},
// "form": {},
// "headers": {
// "Connection": "close",
// "Content-Length": "9",
// "Content-Type": "application/json",
// "Host": "httpbin.org"
// },
// "json": null,
// "origin": "97.77.198.2",
// "url": "http://httpbin.org/post"
// }
