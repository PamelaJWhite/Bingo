console.log("up and running")

//--------global variables--------

let url = "http://localhost:4005"

let baseWordArray = ["red", "orange", "yellow", "green", "blue", "turquoise", "magenta", "grey", "purple", "teal", "monday", "tuesday", "wednesday", "thursday", "friday", "dog", "cat", "fish", "guinea pig", "turtle", "bills", "dolphins", "patriots", "jets", "eagles", "cowboys", "giants", "commanders", "rams", "cardinals"]

//with multiple users, they're going to need their OWN array, 
//not one array that everyone works from 
let newArray = []
// fitty('#new')
//------------- calls to db/ backend------------
//using fetch
const getList = () =>{
  fetch(url)
  .then(response => response.json())
  .then((data) => {
    console.log("data in fetch:", data)
    let foundData = data
    makeRandomArray(foundData)
  });
}

getList()
//------------END calls to db/ backend

//I am so effing proud of myself
//i looked up more than half a dozen ways to shuffle an array, make a random array, etc.
//and then I just came up with this, on my own, which fits my purposes
const makeRandomArray = (data) => {
  //make a copy of the baseWordArray
  // let copiedArray = [...baseWordArray]
  newArray = []

  //loop 24 times
  for (let i = 0; i<=23; i++){
    
    //get a random number between 0 and length of copiedArray
    let newNum = Math.floor(Math.random() * data.length)
    // console.log("newNum: ", newNum)

    //get the word at the index of newNum
    let transferredWord = data.slice(newNum, newNum+1)
    // console.log("transferredWord: ", transferredWord) 

    //put that transferredWord into the newArray
    newArray.push(transferredWord[0])
    // console.log("newArray after push transferredWord: ", newArray)

    //take the word out of the data
    data.splice(newNum, 1)
    // console.log("data after splice: ", data)

    //create a new h3 element
    let textElement = document.createElement("h3")

    //add the newArray[i].phrase to that element's innerhtml
    textElement.innerHTML = newArray[i].phrase
    // console.log("textElement: ", textElement)

    //add a class to the textElement
    textElement.classList.add('phraseText')

    // //grab each box by id, set it's innerHTML to the new element
    document.getElementById(i).appendChild(textElement)
  }
}

const reset = () => {
  console.log("clicked reset")

  getList()
}

const markCell = (event) =>{
  
  let currentId = event.currentTarget.id
 
  let currentElement = event.currentTarget
  
  //if the innerHTML = x
  //then make it the word where the id equals the index
  //else make it X
  currentElement.innerHTML === "X" ? currentElement.innerHTML = newArray[currentId].phrase : currentElement.innerHTML = "X"
 
}