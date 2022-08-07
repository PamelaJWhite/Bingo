console.log("up and running");

//--------global variables--------

// let url = "http://localhost:4004";
let url = "https://bingo-back.herokuapp.com"
// let url = 'https://randomuser.me/api?results=25'

let baseWordArray = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "turquoise",
  "magenta",
  "grey",
  "purple",
  "teal",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "dog",
  "cat",
  "fish",
  "guinea pig",
  "turtle",
  "bills",
  "dolphins",
  "patriots",
  "jets",
  "eagles",
  "cowboys",
  "giants",
  "commanders",
  "rams",
  "cardinals",
];

let newArray = []
//with multiple users, they're going to need their OWN array,
//not one array that everyone works from
// let newArray = [];

//------------- calls to db/ backend------------
//using fetch
const getList = () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("data in fetch:", data);
      let foundData = data;
      makeRandomArray(foundData)
    });
};
getList();
//------------END calls to db/ backend


const assignTypeClass = (newArray)=> {
  // console.log(foundData)
  // let array = makeRandomArray(foundData)
  let array = newArray

  for(i=0; i<array.length; i++){
    // grab the current HTML element
    //bc they're in numeric order, their id and index are equivalent
    currentEl = document.getElementById(i)
    console.log("currentEl: ", currentEl)
    if(array[i].type == '"quote"'){
      // console.log("quote: ", array[i].type)
      currentEl.classList.add("quote")
    }
    if(array[i].type =='"drop"'){
      // console.log("drop: ", array[i].type)
      currentEl.classList.add("drop")
    }
    if(array[i.type =='"sound"']){
      currentEl.classList.add("sound")
    }
  }
}

// //I am so effing proud of myself
// //i looked up more than half a dozen ways to shuffle an array, make a random array, etc.
// //and then I just came up with this, on my own, which fits my purposes
const makeRandomArray = (data) => {
    

    //loop 24 times
    for (let i = 0; i <= 23; i++) {
      //get a random number between 0 and length of copiedArray
      let newNum = Math.floor(Math.random() * data.length);
      // console.log("newNum: ", newNum)

      //get the word at the index of newNum
      let transferredWord = data.slice(newNum, newNum + 1);
      // console.log("transferredWord: ", transferredWord)

      //put that transferredWord into the newArray
      newArray.push(transferredWord[0]);
      // console.log("newArray after push transferredWord: ", newArray)

      //take the word out of the data
      data.splice(newNum, 1);
      // console.log("data after splice: ", data)

      //create a new h3 element
      let textElement = document.createElement("h3");

      //add the newArray[i].phrase to that element's innerhtml
      textElement.innerHTML = newArray[i].phrase;
      // console.log("textElement: ", textElement)

      //add a class to the textElement
      textElement.classList.add("phraseText");

      // //grab each box by id, set it's innerHTML to the new element
      document.getElementById(i).appendChild(textElement);
      
    }
    assignTypeClass(newArray)
};



const reset = () => {
  console.log("clicked reset");
  //!!!!add confirm funciton/ modal that to confirm, yes, reset; no, bring me back to my game
  location.reload()
  // getList();
};

const markCell = (event) => {
  let currentId = event.currentTarget.id;

  let currentElement = event.currentTarget;

  // let footballImg = document.createElement("img")
  // footballImg.classList.add("footballImg")
  // footballImg.src = "football.png"
  // footballImg.addEventListener('click', function handleClick(e) {
  //   footballImg.remove()
  // })

//   const box = document.getElementById('box');

// box.addEventListener('click', function handleClick(event) {
//   box.remove();
// });

  
  //if the innerHTML = x
  //then make it the word where the id equals the index
  //else make it X
  if(currentId == "middle"){
    currentElement.innerHTML === "X"
    ? (
        currentElement.innerHTML = "Andy, Mike, and Jason",
        currentElement.classList.remove("xClass")
        )
    : (
        currentElement.innerHTML = "X",
        currentElement.classList.add("xClass")
      );
  }else{
    currentElement.innerHTML === "X"
    ? (
        currentElement.innerHTML = newArray[currentId].phrase,
        currentElement.classList.remove("xClass")
        )
    : (
        currentElement.innerHTML = "X",
        currentElement.classList.add("xClass")
      );
  }
  
};
