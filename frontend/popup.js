let date = new Date();
let month = date.getMonth() + 1;
let count = 0;

function getURL() {
	if(count == 0){
		makeButtonInvisible();
		makeLoaderVisible();
		
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
			createTitle(body.title);
			createReport(body.in_season_ratio);
		})
    }).catch(error => {
        console.error(error);
	});
	
}

function addIngredientsToUI(ingredientSeasons) {

	var have_any_in_season_ingredients = false;
	var have_any_not_in_season_ingredients = false;
	
	for(var key in ingredientSeasons){
		console.log(ingredientSeasons[key].in_season);
		if(ingredientSeasons[key].in_season == "In season"){
			// Print out in the inSeason div
			printIngredients(ingredientSeasons[key].ingredient, ingredientSeasons[key].seasons, 'in_season');
			have_any_in_season_ingredients = true;

		} else if(ingredientSeasons[key].in_season == "Not in season"){
			// Print out in the not_in_season div
			printIngredients(ingredientSeasons[key].ingredient,ingredientSeasons[key].seasons, 'not_in_season');
            have_any_not_in_season_ingredients = true;
		}
		printIngredients(key, [] ,'other');
	}
	
	
	if(!have_any_in_season_ingredients){
		printIngredients("None...", [],'in_season');
	}

	if(!have_any_not_in_season_ingredients){
		if(!have_any_in_season_ingredients){
			printIngredients("Also none!",[], 'not_in_season');
		} else {
			printIngredients("None!",[], 'not_in_season');
		}
	}
	//printIngredients("None", 'not_in_season');

	makeLoaderInvisible();
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

function makeButtonInvisible(){
	document.getElementById('startApp').classList.add('invisible');
}

function makeLoaderVisible(){
	document.getElementById('container').classList.add('loader_visible');
}

function makeLoaderInvisible(){
	document.getElementById('container').classList.add('loader_invisible');
}

function createTitle(recipeTitle){
	let titleNode = document.createElement('h1');
	let titleNodeText = document.createTextNode(recipeTitle);
	titleNode.appendChild(titleNodeText);
	titleNode.className = 'recipeTitle';

	let nextElement = document.getElementById('content');
	nextElement.insertBefore(titleNode, nextElement.childNodes[3]);
}

function createReport(seasonalityRatio){
	let ratioHolder = document.createElement('div');
	ratioHolder.className = 'bar';
	let ratioFill = document.createElement('div');
	ratioFill.className = 'progress';
	let ratioNodeText;
	let root = document.documentElement;

	if(seasonalityRatio == 0){
		root.style.setProperty('--fillRatio',  "5%");
	}
	else{
		root.style.setProperty('--fillRatio', (seasonalityRatio*100) + "%");
	}
	
	if(seasonalityRatio == 0){
		ratioNodeText = document.createTextNode("Not In Season");
	}else if(seasonalityRatio <= 0.5){
		ratioNodeText = document.createTextNode("Somewhat In Season");
		root.style.setProperty('--finalColor', "#fdd835");
	}else if(seasonalityRatio < 1){
		ratioNodeText = document.createTextNode("Mostly In Season");
		root.style.setProperty('--finalColor', "green");
	}else{
		ratioNodeText = document.createTextNode("Fully In Season");
		root.style.setProperty('--finalColor', "#c4f236");
	}

	
	ratioHolder.appendChild(ratioFill);
	let nextElement = document.getElementById('content');
	nextElement.insertBefore(ratioHolder, nextElement.childNodes[4]);

	let SeasonOTron = document.createElement('div');
	let SeasonOTronText = document.createTextNode("Season-O-Meter");
	SeasonOTron.className = "SOMeter";
	SeasonOTron.appendChild(SeasonOTronText);
	nextElement.insertBefore(SeasonOTron, nextElement.childNodes[5]);

}

document.getElementById('startApp').addEventListener('click', getURL);

