startApp.onclick = function(element) {
	chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
	    let url = tabs[0].url;
	});
	
	console.log("blabla");
};