"use strict";
let gridItems = document.getElementsByClassName('grid-item');
let gridTileHeight = gridItems[0].clientHeight;

let backgrounds = [
  "resources/images/background/rl_background01.png",
  "resources/images/background/rl_background02.jpg",
  "resources/images/background/rl_background03.jpg"
];

startFunction();

function startFunction() {
  centerTileText();
  setBackground();
}

function setBackground() {
  let randomBackground = Math.floor((Math.random() * backgrounds.length));
  let background = document.getElementById("background");
  background.style.backgroundImage = "url("+backgrounds[randomBackground]+")";
}


function centerTileText() {
  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].style.lineHeight = gridTileHeight + "px";
  }
}
