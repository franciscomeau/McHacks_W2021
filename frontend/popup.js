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
    axios.post('https://mchacks-2k21.herokuapp.com/',{url: url})
        .then(response => {
            console.log('After fetch!', response, response.data)
            addIngredientsToUI(response.data);
        })
        .catch(error => console.error(error));
}

function addIngredientsToUI(ingredientSeasons) {
    //DO DOM shit
}

document.getElementById('startApp').addEventListener('click', getURL);