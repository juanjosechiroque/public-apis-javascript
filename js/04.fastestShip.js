
async function fastestShip(passengers) {
  
  var starships = await getStarships();
  
  console.log("Son un total de", starships.length, "naves");
  
  var result = getStarshipsFiltered(starships,passengers);
  
  return result;
  
}

function getStarshipsFiltered(starships,passengers) {
  
  var result = "";
  var starships_filtered = [];
  
  starships.forEach(function (item, idx) {
    
    if(parseInt(item.passengers) >= passengers && isOriginalTrilogy(item.films) && hasConsumibleOneWeek(item)) {
      starships_filtered.push(item);      
    }
    
  });
  
  console.log(starships_filtered);
  
  if(starships_filtered.length == 1) {
    result = starships_filtered[0].name;
  } else {
    result = getStarshipFast(starships_filtered);
  }
  
  return result;
  
}

function getStarshipFast(starships) {
  
  var maxFast = 0;
  var fastShip = "";
  
  starships.forEach(function (item, idx) {
    if(parseFloat(item.hyperdrive_rating) > maxFast){
      maxFast = parseFloat(item.hyperdrive_rating);
      fastShip = item.name;
    }
  });
  
  return fastShip;
  
}


function hasConsumibleOneWeek(starship){
  
  var result = false;
  
  if(starship.consumables.includes("year") || starship.consumables.includes("month") ) {
    
    result = true;
    
  } else if ( starship.consumables.includes("day") ) {
    
    var days = starship.consumables.split(" ");
    
    if(parseInt(days[0]) >= 7 ) {
      result = true;
    }     
    
  } else {
    result = false;
  }
  
  return result;
  
}

function isOriginalTrilogy(films) {
  
  var isTrilogy = false;
  
  films.forEach(function(item, idx) {
    if(item.includes("films/1/") || item.includes("") || item.includes("")) {
      isTrilogy = true;
    }
  });
  
  return isTrilogy;
  
}

async function getStarships () {
  
  var starships = [];
  
  var result_api = await callAPI("https://swapi.dev/api/starships/");
  
  var executing = true;
  
  do {
    
    starships = starships.concat(result_api.results);
    
    if(result_api.next != null) {
      result_api = await callAPI(result_api.next);
    } else {
      executing = false;
    }
    
  } while(executing);
  
  
  return starships;
  
}

async function callAPI(url) {  
  var response = await fetch(url);
  var json = await response.json();
  return json;
}

(
  async () => {
    var result = await fastestShip(100);        
    console.log("La nave más rápida es", result);
  }
)()