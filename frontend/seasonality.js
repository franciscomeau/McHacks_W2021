function printIngredients(){
    let inSeason = document.getElementById('in_season');
    let notInSeason = document.getElementById('not_in_season');
    console.log(inSeason);
}

document.getElementById('in_season').addEventListener('click', printIngredients);

