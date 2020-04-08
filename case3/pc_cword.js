"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 11
   Case Problem 3

   Crossword Puzzle Script
   
   Author: 
   Date:   
   
   Global Variables
   ================
   allLetters
      References all of the letter cells in the crossword table#crossword
   
   currentLetter
      References the letter currently selected in the puzzleLetter
      
   wordLetters
      References the across and down letters in the word(s) associated with the current letter
   
   acrossClue
      References the across clue associated with the current letter
      
   downClue
      References the down clue associated with the current letter
      
         
   Functions
   =========
   
   init()
      Initializes the puzzle, setting up the event handlers and the variable values
       
   formatPuzzle(puzzleLetter)
      Formats the appearance of the puzzle given the selected puzzle letter
      
   selectLetter(e)
      Applies keyboard actions to select a letter or modify the puzzle navigation
      
   switchTypeDirection()
      Toggles the typing direction between right and down
      
   getChar(keyNum)
      Returns the text character associated with the key code value, keyNum


*/

allLetters = document.querySelectorAll("table#crossword span");

currentLetter = allLetters[0];

var acrossID = currentLetter.dataset.clueA;

var downID = currentLetter.dataset.clueD;

acrossClue = document.getElementById(currentLetter.dataset.clueA);

downClue = document.getElementById(currentLetter.dataset.clueD);
// starts the format puzzle function
function formatPuzzle(puzzleLetter) {
 
   //changes value of current letter to puzzle letter
   currentLetter = puzzleLetter; 
   
   //changes the background colors to an empty string
   for (var i = 0; i < allLetters.length; i++) {
      allLetters[i].style.backgroundColor = "";
   }
   
   //changes color style to an empty string
   acrossClue.style.color = "";
   downClue.style.color = "";
   
   //if statement that tests if its is not equal to undefined and that if it is true do the following
   if (currentLetter.dataset.clueA !== undefined) {
 
      //references the cross clue for the current letter
      acrossClue = document.getElementById(currentLetter.dataset.clueA);
 
      //changes the color of the across clue to blue
      acrossClue.style.color = "blue";
 
      //makes it so wordLetters references all elements selected by the CSS selector
      wordLetters = document.querySelectorAll("[data-clue-a = " + currentLetter.dataset.clueA + "]");
 
      //changes the background color to light blue
      for (var i = 0; i < wordLetters.length; i++) {
         wordLetters[i].style.backgroundColor = "rgb(231, 231, 255)";
      }
   }
 
    //if statement that tests if its is not equal to undefined and that if it is true do the following
   if (currentLetter.dataset.clueD !== undefined) {
      //references the cross clue for the current letter
      downClue = document.getElementById(currentLetter.dataset.clueD);
      //changes the color of the across clue to red
      downClue.style.color = "red";
      //makes it so wordLetters references all elements selected by the CSS selector
      wordLetters = document.querySelectorAll("[data-clue-d = " + currentLetter.dataset.clueD + "]");
      //changes the background color to light red
      for (var i = 0; i < wordLetters.length; i++) {
         wordLetters[i].style.backgroundColor = "rgb(255, 231, 231)";
      }
   }
   
   //indicated what direction that you are typing in and will change color depending on which
   if (typeDirection === "right") {
      currentLetter.style.backgroundColor = "rgb(191, 191, 255)";
   } else {
      currentLetter.style.backgroundColor = "rgb(255, 191, 191)";
   }
}

function init() {
//runs the format puzzle function
formatPuzzle(currentLetter);
   
//makes it so boxes can be selected
for (var i = 0; i < allLetters.length; i++) {
   //changes the cursor style
   allLetters[i].style.cursor = "pointer";  
   //on the mouse down event it activates the formatPuzzle function
   allLetters[i].onmousedown = function(e) {
      formatPuzzle(e.target);
      };
   }
}


//a function that allows users to select cells using the keyboard
function selectLetter(e) {

//variable that that represent their respective letter
var leftLetter = document.getElementById(currentLetter.dataset.left);
var upLetter = document.getElementById(currentLetter.dataset.up);
var rightLetter = document.getElementById(currentLetter.dataset.right);  
var downLetter = document.getElementById(currentLetter.dataset.down);

 //set  var userKey to equal e.keyCode
var userKey = e.keyCode;

//an if statement that uses the users key input to do an action
if (userKey === 37) {
   formatPuzzle(leftLetter);  // Move left in the puzzle
} else if (userKey === 38) {
   formatPuzzle(upLetter);  // Move up in the puzzle
} else if (userKey === 39 || userKey === 9) {
   formatPuzzle(rightLetter);  // Move right in puzzle
} else if (userKey === 40 || userKey === 13) {
   formatPuzzle(downLetter);  // Move down in the puzzle
} else if (userKey === 8 || userKey === 46) {
   currentLetter.textContent = "";  // Delete the current letter
} 
//if the spacebar key is hit the typing direction is changed
else if (userKey === 32) {
   switchTypeDirection();  // Toggle the typing direction between right and down
} 
//if the letters a through z key are hit the letter will appear in the box
else if (userKey >= 65 && userKey <= 90) {
   currentLetter.textContent = getChar(userKey); // Write the letter typed by the user 
   if (typeDirection === "right") {
      formatPuzzle(rightLetter);  // Move right after typing the letter
   } else {
      formatPuzzle(downLetter);  // Move down after typing the letter
   }
}

//prevent default
e.preventDefault();
}

/*====================================================*/

function getChar(keyNum) {
   return String.fromCharCode(keyNum);
}
