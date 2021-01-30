function getURL() {
	let url;
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	     var activeTab = tabs[0];
	     url = activeTab.url;
	     console.log(url);
      });
      
    getIngredientSeasons(url);
};

function getIngredientSeasons(url) {
    fetch('https://mchacks-2k21.herokuapp.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({url: url})
    }).then(response => {
        console.log('fetched!', response, response.json())
    }).catch(error => {
        console.error(error);
    });
}

function addIngredientsToUI(ingredientSeasons) {
    //DO DOM shit
}

document.getElementById('startApp').addEventListener('click', getURL);