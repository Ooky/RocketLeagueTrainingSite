"use strict";
let gridItems = document.getElementsByClassName('grid-item');
let gridTileHeight = gridItems[0].clientHeight;
startFunction();

function startFunction() {
  centerTileText();
}


function centerTileText() {
  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].style.lineHeight = gridTileHeight + "px";
  }
}
