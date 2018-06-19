"use strict";
let gridItems = document.getElementsByClassName('grid-item');
let gridTileHeight = gridItems[0].clientHeight;

let cars = [
  "rl_background01.png",
  "rl_background02.jpg",
  "rl_background03.jpg"
];

startFunction();

function startFunction() {
  centerTileText();
  setBackground();
}

function setBackground() {
  let background = document.getElementById("background");
  background.style.backgroundImage = "url('resources/images/background/rl_background01.png')";
}


function centerTileText() {
  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].style.lineHeight = gridTileHeight + "px";
  }
}
