let date = new Date();
let month = date.getMonth() + 1;

function getURL() {
	let url;
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	     var activeTab = tabs[0];
		 url = activeTab.url;
		 getIngredientSeasons(url);
      });
    
};

function getIngredientSeasons(url) {
	console.log(JSON.stringify({url:url}));
    fetch('https://mchacks-2k21.herokuapp.com/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({url: url, month : month})
    }).then(response => {
		response.json().then(body => {
			console.log('fetched!', response, body);
			addIngredientsToUI(body);
		})
    }).catch(error => {
        console.error(error);
    });
}

function addIngredientsToUI(ingredientSeasons) {
	//DO DOM shit
	console.log(ingredientSeasons);
	for(var key in ingredientSeasons){
		console.log(ingredientSeasons[key].in_season);
		if(ingredientSeasons[key].in_season == "In season"){
			// Print out in the inSeason div
			printIngredients(ingredientSeasons[key].ingredient, 'in_season');
			

		} else if(ingredientSeasons[key].in_season == "Not in season"){
			// Print out in the not_in_season div
			printIngredients(ingredientSeasons[key].ingredient, 'not_in_season');


		} else if(ingredientSeasons[key].in_season == "N/A"){
			// Print out in the other div
			printIngredients(ingredientSeasons[key].ingredient, 'other');

		}
	}

	
}

function printIngredients(anIngredient, divID){
	let seasonality = document.getElementById(divID);

	let ingredientNode = document.createElement('p');
	let ingredientNodeText = document.createTextNode(anIngredient);
	ingredientNode.appendChild(ingredientNodeText);
	seasonality.appendChild(ingredientNode);

}


document.getElementById('startApp').addEventListener('click', getURL);