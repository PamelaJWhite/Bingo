console.log("up and running")
//---------imports-----------
//Import axios for api call
// import axios from "axios";

//--------global variables--------

let url = "http://localhost:4005"

let baseWordArray = ["red", "orange", "yellow", "green", "blue", "turquoise", "magenta", "grey", "purple", "teal", "monday", "tuesday", "wednesday", "thursday", "friday", "dog", "cat", "fish", "guinea pig", "turtle", "bills", "dolphins", "patriots", "jets", "eagles", "cowboys", "giants", "commanders", "rams", "cardinals"]

//with multiple users, they're going to need their OWN array, 
//not one array that everyone works from 
let newArray = []

//------------- calls to db/ backend------------
//get the ffblist from the db 
//using axios
const getList = () => {
  console.log("in getList()")
  //axios get call for all titles, including token in header for authorization
  axios.get(url + `/`)
  .then((res)=> {
      console.log("made axios call!")
      //loop over res.data
      for(let i= 0; i< res.data.length; i++){
        //put each phrase in phraseArray
        newArray.push(res.data[i].phrase)
      }
  })
  .then(()=>{
    makeRandomArray()
  
    //loop 25 times
    for (let i = 0; i<=23; i++){
      //grab each box by id, set it's innerHTML to the word at the index i
      document.getElementById(i).innerHTML = newArray[i];
    }
  }
    
  )
}


//I am so effing proud of myself
//i looked up more than half a dozen ways to shuffle an array, make a random array, etc.
//and then I just came up with this, on my own, which fits my purposes
const makeRandomArray = () => {
  //make a copy of the baseWordArray
  // let copiedArray = [...baseWordArray]

  //make a copy of the baseWordArray
  let copiedArray = [...baseWordArray]


  //loop 25 times
  for (let i = 0; i<=23; i++){
    //get a random number between 0 and length of copiedArray
    let newNum = Math.floor(Math.random() * copiedArray.length)

    //get the word at the index of newNum
    transferredWord = copiedArray.slice(newNum, newNum+1)

    //put that transferredWord into the newArray
    newArray.push(transferredWord[0])

    //take the word out of the copiedArray
    copiedArray.splice(newNum, 1)
  }
  return newArray
}

const reset = () => {
  console.log("clicked reset")

  getList()

  newArray = []

  // makeRandomArray()
  
  // //loop 25 times
  // for (let i = 0; i<=23; i++){
  //   //grab each box by id, set it's innerHTML to the word at the index i
  //   document.getElementById(i).innerHTML = newArray[i];
  // }
}

const markCell = (event) =>{
  console.log("event.currentTarget.id: ", event.currentTarget.id)
  let currentId = event.currentTarget.id
  console.log("currentId: ", currentId)
  let currentElement = event.currentTarget
  console.log("currentElement: ", currentElement)
  //if the innerHTML = x
  //then make it the word where the id equals the index
  //else make it X
  currentElement.innerHTML === "X" ? currentElement.innerHTML = newArray[currentId] : currentElement.innerHTML = "X"
  // console.log()
  
  
  
}