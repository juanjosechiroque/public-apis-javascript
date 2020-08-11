
async function fetchAndOrder() {
  var response = await getPersons();     
  var persons = sortPersons(response.results);      
  return persons;
}

async function getPersons() {
  var response = await fetch("https://randomuser.me/api/?results=10");
  var json = await response.json();
  return json;
}

function sortPersons(persons) {  
  persons.sort(function (item1, item2) {    
    if (item1.name.first < item2.name.first) 
      return -1;
    else if (item1.name.first > item2.name.first) 
      return 1;
    return 0;    
  });
  return persons;
}

(
  async () => {
    var results = await fetchAndOrder();    
    results.forEach(function(item, idx) {
      console.log(idx + 1 + ". " + item.name.first);
    });
  }
)()