// 02 Fetch & Find
async function fetchAndFind(age) {   
  
  var person = "";
  var executing = true;

  do {

    person = await getPerson(age); 
    
    if(person.dob.age > age){      
      executing = false;
    }

  } while (executing);

  return person;
  
}

async function getPerson() {  
  var response = await fetch("https://randomuser.me/api");
  var json = await response.json();
  return json.results[0];
}

(
  async () => {
    var persona = await fetchAndFind(40);    
    console.log("La persona tiene ", persona.dob.age, " años");
  }
)()
