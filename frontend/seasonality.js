let count = 0;


function printIngredients(){
    if(count == 0){
        let inSeason = document.getElementById('in_season');
        let notInSeason = document.getElementById('not_in_season');
        let other = document.getElementById('other');
    
        let ingredientNode = document.createElement('p');
        let ingredientNodeText = document.createTextNode("Blablabla");
        ingredientNode.appendChild(ingredientNodeText);
        inSeason.appendChild(ingredientNode);
        count++;
    }
}

document.getElementById('startApp').addEventListener('click', printIngredients);

