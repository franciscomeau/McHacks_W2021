function getURL() {
	
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	     var activeTab = tabs[0];
	     var myUrl = activeTab.url;
	     console.log(myUrl);
	  });	
};

document.getElementById('startApp').addEventListener('click', getURL);