// 03 Fetch & Count
async function fetchAndCount() {   
  
  var persons = await getPersons();
  var maxLetter = getMaxLetter(persons);
  return maxLetter;
}

async function getPersons() {  
  var response = await fetch("https://randomuser.me/api/?results=5");
  var json = await response.json();
  return json.results;
}

function getMaxLetter(persons) {   
  
  var all_chars = "";
  
  persons.forEach(function(item) {            
    console.log("-", item.name.first, item.name.last);
    all_chars = all_chars + item.name.first + '' + item.name.last;    
  });  
  
  return getLetterMostRepeted(all_chars);    
  
}

function getLetterMostRepeted(name) {
  
  name = name.toLowerCase(); 
  
  var unique_letters = name.split("");
  unique_letters = unique_letters.filter(function(value, index){ return unique_letters.indexOf(value) == index });
  
  var max = 0;
  var maxChar = "";
  var letterRepeated = 0;
  
  unique_letters.forEach(function(char) {
    
    letterRepeated = getLetterRepeated(name, char);    
    
    if(letterRepeated  > max) {
      max = getLetterRepeated(name, char);
      maxChar = char;
    }
    
  });
  
  return maxChar;
  
}

function getLetterRepeated(word, letter) {
  
  var count = 0;
  word = word.toLowerCase();
  
  word.split("").forEach(function (item) {
    if(item === letter) {
      count++;
    }
  });
  
  return count;
  
}

(
  async () => {
    var letter = await fetchAndCount();    
    console.log("La letra más utilizada es:", letter);
  }
)()
