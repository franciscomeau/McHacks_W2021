function getURL() {
	
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	     var activeTab = tabs[0];
	     var myUrl = activeTab.url;
	     console.log(myUrl);
	  });
	
	var request = new XMLHttpRequest();
    request.open("GET", "sample_ingredients.json", false);
    request.send(null);
    var my_JSON_object = JSON.parse(request.responseText);
    console.log(JSON.stringify(my_JSON_object));
};

document.getElementById('startApp').addEventListener('click', getURL);