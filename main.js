console.log("up and running");

//--------global variables--------

// let url = "http://localhost:4004";
let url = "https://bingo-back.herokuapp.com";

let newArray = [];

//------------- calls to db/ backend------------
//using fetch
const getList = () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("data in fetch:", data);
      let foundData = data;
      makeRandomArray(foundData);
    });
};
getList();
//------------END calls to db/ backend

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
  assignTypeClass(newArray);
};

const assignTypeClass = (newArray) => {
  let array = newArray;

  for (i = 0; i < array.length; i++) {
    // grab the current HTML element
    //bc they're in numeric order, their id and index are equivalent
    currentEl = document.getElementById(i);
    // console.log("currentEl: ", currentEl)
    if (array[i].type == "quote") {
      // console.log("quote: ", array[i].type)
      currentEl.classList.add("quote");
    }
    if (array[i].type == "drop") {
      // console.log("drop: ", array[i].type)
      currentEl.classList.add("drop");
    }
    if (array[i].type == "sound") {
      currentEl.classList.add("sound");
    }
    if (array[i].phrase == "#notasponsor") {
      currentEl.classList.add("supersmall");
      // console.log(array[i].phrase, "#notasponsor")
    }
    if (array[i].phrase == "your friendly, neighborhood wizard") {
      // console.log(array[i].phrase, "wizard")
      currentEl.classList.add("supersmall");
    }
    if (array[i].phrase == "Jared Garff announcement bugle") {
      // console.log(array[i].phrase, "garff")
      currentEl.classList.add("supersmall");
    }
  }
};
let board = [
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, "middle", 12, 13],
  [14, 15, 16, 17, 18],
  [19, 20, 21, 22, 23],
];

let changeBoard = [
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, "middle", 12, 13],
  [14, 15, 16, 17, 18],
  [19, 20, 21, 22, 23],
];

const markCell = (event) => {
  let currentId = event.currentTarget.id;

  let currentElement = event.currentTarget;

  //if the innerHTML = x
  //then make it the word where the id equals the index
  //else make it X
  if (currentId == "middle") {
    currentElement.innerHTML === "X"
      ? ((currentElement.innerHTML = "Andy, Mike, and Jason"),
        currentElement.classList.remove("xClass"))
      : ((currentElement.innerHTML = "X"),
        currentElement.classList.add("xClass"));
  } else {
    currentElement.innerHTML === "X"
      ? ((currentElement.innerHTML = newArray[currentId].phrase),
        currentElement.classList.remove("xClass"))
      : ((currentElement.innerHTML = "X"),
        currentElement.classList.add("xClass"));
  }
  markBoard(currentId);
};
let column = null;
const markBoard = (id) => {
  //loop over the array of 5 arrays
  //each of the 5 is i
  for (let i = 0; i < board.length; i++) {
    //find the index of the element with the matching id in the ORIGINAL board
    //i is row
    const foundIndex = board[i].findIndex((element) => element == id);
    //change the CHANGE board at that index
    //if CHANGE board at that index == "x"
    if (foundIndex !== -1) {
      if (changeBoard[i][foundIndex] == "x") {
        console.log("Change it back");
        changeBoard[i][foundIndex] = id;
      } else {
        console.log("Make it an x");
        changeBoard[i][foundIndex] = "x";
      }
    }
  }
  console.log("changeBoard:", changeBoard);
  checkForWin();
};

const checkForWin = () => {
  // //double loop so I have i(row) and j(column) to work with?
  // for (let i = 0; i < 5; i++) {
  //   for (let j = 0; j < 5; j++) {
  //     // console.log("i: ", i, "j: ", j)
  //     let currentMarker = changeBoard[i][j];
  //     // console.log(currentMarker)
  //   }
  // }


  //12 if statements
  //ROWS
  if(changeBoard[0][0] == "x" && changeBoard[0][1]== "x"&& changeBoard[0][2]== "x"&& changeBoard[0][3]== "x"&& changeBoard[0][4]== "x"){
    console.log("top row wins")
    displayWin()
  }
  if(changeBoard[1][0]== "x" && changeBoard[1][1]== "x"&& changeBoard[1][2]== "x"&& changeBoard[1][3]== "x"&& changeBoard[1][4]== "x"){
    console.log("second row wins")
    displayWin()
  }
  if(changeBoard[2][0]== "x" && changeBoard[2][1]== "x"&& changeBoard[2][2]== "x"&& changeBoard[2][3]== "x"&& changeBoard[2][4]== "x"){
    console.log("third row wins")
    displayWin()
  }
  if(changeBoard[3][0]== "x" && changeBoard[3][1]== "x"&& changeBoard[3][2]== "x"&& changeBoard[3][3]== "x"&& changeBoard[3][4]== "x"){
    console.log("4th row wins")
    displayWin()
  }
  if(changeBoard[4][0]== "x" && changeBoard[4][1]== "x"&& changeBoard[4][2]== "x"&& changeBoard[4][3]== "x"&& changeBoard[4][4]== "x"){
    console.log("5th row wins")
    displayWin()
  }

  //COLUMNS
  if(changeBoard[0][0] == "x" && changeBoard[1][0]== "x"&& changeBoard[2][0]== "x"&& changeBoard[3][0]== "x"&& changeBoard[4][0]== "x"){
    console.log("top column wins")
    displayWin()
  }
  if(changeBoard[0][1]== "x" && changeBoard[1][1]== "x"&& changeBoard[2][1]== "x"&& changeBoard[3][1]== "x"&& changeBoard[4][1]== "x"){
    console.log("second column wins")
    displayWin()
  }
  if(changeBoard[0][2]== "x" && changeBoard[1][2]== "x"&& changeBoard[2][2]== "x"&& changeBoard[3][2]== "x"&& changeBoard[4][2]== "x"){
    console.log("third column wins")
    displayWin()
  }
  if(changeBoard[0][3]== "x" && changeBoard[1][3]== "x"&& changeBoard[2][3]== "x"&& changeBoard[3][3]== "x"&& changeBoard[4][3]== "x"){
    console.log("4th column wins")
    displayWin()
  }
  if(changeBoard[0][4]== "x" && changeBoard[1][4]== "x"&& changeBoard[2][4]== "x"&& changeBoard[3][4]== "x"&& changeBoard[4][4]== "x"){
    console.log("5th row wins")
    displayWin()
  }

  //DIAGONALS
  if(changeBoard[0][0]== "x" && changeBoard[1][1]== "x"&& changeBoard[2][2]== "x"&& changeBoard[3][3]== "x"&& changeBoard[4][4]== "x"){
    console.log("diagonal win")
    displayWin()
  }
  if(changeBoard[4][0]== "x" && changeBoard[3][1]== "x"&& changeBoard[2][2]== "x"&& changeBoard[1][3]== "x"&& changeBoard[0][4]== "x"){
    console.log("diaonal")
    displayWin()
  }
};

const displayWin = () => {  
  //grab winnerModal by id
  document.getElementById("modalCont").style.zIndex = "2"
  document.getElementById("modalCont").style.opacity = "1.0"

  document.getElementById("main").style.opacity = "0.5"
  document.getElementById("nav").style.opacity = "0.5"

  document.getElementById("bingoText").style.transform ="rotate(0deg)"




  //change style of winnerModal class 

  //
}

const returnToGame = () => {
  console.log("return to game")
  document.getElementById("modalCont").style.zIndex = "-1"
  document.getElementById("modalCont").style.opacity = "0.0"

  document.getElementById("main").style.opacity = "1"
  document.getElementById("nav").style.opacity = "1"

  document.getElementById("bingoText").style.transform ="rotate(0.5turn)"


}
const reset = () => {
  console.log("clicked reset");
  //!!!!add confirm funciton/ modal that to confirm, yes, reset; no, bring me back to my game
  location.reload();
  // getList();
};
