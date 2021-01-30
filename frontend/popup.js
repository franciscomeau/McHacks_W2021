let date = new Date();
let month = date.getMonth() + 1;
let count = 0;

function getURL() {
	if(count == 0){
		let url;
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			 var activeTab = tabs[0];
			 url = activeTab.url;
			 getIngredientSeasons(url);
		  });
		  count++;
	}

    
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
			addIngredientsToUI(body.ingredients);
		})
    }).catch(error => {
        console.error(error);
	});
	
}

function addIngredientsToUI(ingredientSeasons) {
	//DO DOM shit
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
			printIngredients(key, 'other');

		}
	}
	makeVisible();
	

	
}

function printIngredients(anIngredient, divID){
	let seasonality = document.getElementById(divID);
	console.log("DIV IDDDDD" + divID);
	console.log("HELLLLO" + anIngredient);

	let ingredientNode = document.createElement('p');
	let ingredientNodeText = document.createTextNode(anIngredient);
	ingredientNode.appendChild(ingredientNodeText);
	seasonality.appendChild(ingredientNode);
}

function makeVisible(){
	document.getElementById('in_season').classList.add('visible');
	document.getElementById('not_in_season').classList.add('visible');
	document.getElementById('other').classList.add('visible');
	document.getElementById('seasonality').classList.add('visible');
}

document.getElementById('startApp').addEventListener('click', getURL);

