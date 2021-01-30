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
			printIngredients(ingredientSeasons[key].ingredient, ingredientSeasons[key].seasons, 'in_season');
			

		} else if(ingredientSeasons[key].in_season == "Not in season"){
			// Print out in the not_in_season div
			printIngredients(ingredientSeasons[key].ingredient,ingredientSeasons[key].seasons, 'not_in_season');


		} else if(ingredientSeasons[key].in_season == "N/A"){
			// Print out in the other div
			printIngredients(key,ingredientSeasons[key].seasons, 'other');

		}
	}
	makeVisible();
	

	
}

function printIngredients(anIngredient, inSeasonArray, divID){
	let seasonality = document.getElementById(divID);
	console.log("DIV IDDDDD" + divID);
	console.log("HELLLLO" + anIngredient);

    let ingredientNode = document.createElement('p');
    let ingredientNodeText = document.createTextNode(anIngredient);
    
    ingredientNode.appendChild(ingredientNodeText);

    //Only have tooltip for in seasonal things
    if(inSeasonArray.length > 0)
        ingredientNode.appendChild(createInSeasonTooltip(inSeasonArray, ingredientNode))

	seasonality.appendChild(ingredientNode);
}

function createInSeasonTooltip(inSeasonArray, targetNode) {
    

    let tooltip = document.createElement('p');
    tooltip.classList.add('tooltip');
    tooltip.appendChild(generateTooltipHeader())
    tooltip.appendChild(document.createTextNode(inSeasonArray.join(', ')));

    targetNode.addEventListener("mouseover", showTooltip(tooltip));

    targetNode.addEventListener("mouseout", hideTooltip(tooltip));
    
    return tooltip;
}

function generateTooltipHeader() {

    let headerTextContainer = document.createElement('p');
    headerTextContainer.classList.add('tooltipHeader');
    
    headerTextContainer.appendChild(document.createTextNode('Fresh Seasons'));

    return headerTextContainer
}

function showTooltip(tooltipEl) {
    return function () {
        tooltipEl.classList.add('tooltipShow');
    }
}

function hideTooltip(tooltipEl) {
    return function () {
        tooltipEl.classList.remove('tooltipShow');
    }
}

function makeVisible(){
	document.getElementById('in_season').classList.add('visible');
	document.getElementById('not_in_season').classList.add('visible');
	document.getElementById('other').classList.add('visible');
	document.getElementById('seasonality').classList.add('visible');
}

document.getElementById('startApp').addEventListener('click', getURL);

