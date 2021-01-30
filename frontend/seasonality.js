let count = 0;


// function printIngredients(){
//     if(count == 0){
//         let seasonality = document.getElementById('seasonality');
//         let inSeason = document.getElementById('in_season');
//         let notInSeason = document.getElementById('not_in_season');
//         let other = document.getElementById('other');
        
//         console.log(seasonality);
//         other.classList.add("visible");
//         seasonality.classList.add("visible");
    
//         let ingredientNode = document.createElement('p');
//         let ingredientNodeText = document.createTextNode("Blablabla");
//         ingredientNode.appendChild(ingredientNodeText);
//         inSeason.appendChild(ingredientNode);
//         count++;
//     }
// }

document.getElementById('startApp').addEventListener('click', printIngredients);

