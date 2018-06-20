"use strict";
let gridItems = document.getElementsByClassName('grid-item');
let gridContainerTilesChildNodes = document.getElementsByClassName("grid-container-tiles")[0].childNodes;
let trainingTiles = [];
let isMaximazed = false;

let backgrounds = [
  "resources/images/background/rl_background01.png",
  "resources/images/background/rl_background02.jpg",
  "resources/images/background/rl_background03.jpg"
];

startFunction();

function startFunction() {
  window.addEventListener('resize', centerTileText);
  centerTileText();
  setBackground();
  initTrainingTiles();
  addEventListenerToGridTiles();
}

function initTrainingTiles() {
  for (let i = 1; i < gridContainerTilesChildNodes.length; i += 2) {
    trainingTiles.push(gridContainerTilesChildNodes[i]);
  }
}

function addEventListenerToGridTiles() {
  let startTileID = 2;
  for (let i = 0; i < trainingTiles.length; i++) {
    let id = "grid-item" + (i + startTileID);
    document.getElementById(id).addEventListener("click", tileInfo);
  }
}

function tileInfo() {
  if (!isMaximazed) {
    //Maximize Tile
    for (let i = 0; i < trainingTiles.length; i++) {
      if (this.id != trainingTiles[i].id) {
        trainingTiles[i].style.display = "none";
      } else {
        this.style.gridArea = "1 / 1 / -1 / -1";
      }
    }
    isMaximazed = true;
  } else {
    for (let i = 0; i < trainingTiles.length; i++) {
      trainingTiles[i].style.display = "inline";
      trainingTiles[i].style.gridArea = "auto";
    }
    isMaximazed = false;
  }
}

function setBackground() {
  let randomBackground = Math.floor((Math.random() * backgrounds.length));
  let background = document.getElementById("background");
  background.style.backgroundImage = "url(" + backgrounds[randomBackground] + ")";
}

function centerTileText() {
  let gridTileHeight = gridItems[0].clientHeight;
  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].style.lineHeight = gridTileHeight + "px";
  }
}
