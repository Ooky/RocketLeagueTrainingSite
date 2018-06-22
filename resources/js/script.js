"use strict";
let gridItems = document.getElementsByClassName('grid-item');
let gridContainerTilesChildNodes = document.getElementsByClassName("grid-container-tiles")[0].childNodes;
let trainingTiles = [];
let isMaximazed = false;
let jsonObject = null;
let oldTileWidth;
let oldTileHeight;
let tileBoundariesSet = false;
let videos = null;
const startTile = 2;
let pText = null;


startFunction();

function startFunction() {
  window.addEventListener('resize', centerTileText);
  // window.addEventListener('resize', resizeVideos);
  generateJSONObject("resources/json/data.json");
  centerTileText();
  setBackground();
  initTrainingTiles();
  addVideosToHTML();
  addEventListenerToGridTiles();
  addTextToVideos();
}

function addTextToVideos() {
  if (jsonObject != null) {
    for (let i = 0; i < trainingTiles.length; i++) {
      let id = "grid-item" + (i + startTile);
      let div = document.createElement("div");
      div.addEventListener("mouseenter", playVideo);
      div.addEventListener("mouseleave", pauseVideo);
      div.setAttribute("class", "videoText");
      div.setAttribute("id", (i + startTile));
      let element = document.getElementById(id);
      element.appendChild(div);
      let pTag = document.createElement("p");
      let description = document.createTextNode(jsonObject.videoInfo[i].time);
      pTag.appendChild(description);
      div.appendChild(pTag);
    }
    pText = document.getElementsByTagName("p");
  } else {
    window.setTimeout(addTextToVideos, 100);
  }
}

function playVideo() {
  if (!isMaximazed) {
    videos[this.id - startTile].play();
    for (let i = 0; i < videos.length; i++) {
      videos[i].style.opacity = "0.3";
      pText[i].style.opacity = "0.1";
    }
    videos[this.id - startTile].style.opacity = "1";
    pText[this.id - startTile].style.opacity = "0.4";
  }
}

function pauseVideo() {
  if (!isMaximazed) {
    videos[this.id - startTile].pause();
    for (let i = 0; i < videos.length; i++) {
      videos[i].style.opacity = "0.8";
      pText[i].style.opacity = "0.6";
    }
  }
}

function resizeVideos() {
  let elements = document.getElementsByClassName("grid-tiles");
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.height = "20vh";
    // elements[i].style.width = "calc(100vw -12%)";
  }
  let width = getWidthOfTile(trainingTiles[0].id);
  let height = getHeightOfTile("grid-item2");
  for (let i = 0; i < videos.length; i++) {
    videos[i].width = width;
    videos[i].height = height;
  }
}



function tileInfo() {
  if (!tileBoundariesSet) {
    if (this.id == 0) {
      oldTileWidth = trainingTiles[0].offsetWidth;
      oldTileHeight = trainingTiles[0].offsetHeight;
    } else {
      oldTileWidth = trainingTiles[1].offsetWidth;
      oldTileHeight = trainingTiles[1].offsetHeight;
    }
    tileBoundariesSet = true;
  }
  if (!isMaximazed) {
    //Maximize Tile
    for (let i = 0; i < trainingTiles.length; i++) {
      if (this.id != trainingTiles[i].id) {
        trainingTiles[i].style.display = "none";
      } else {
        this.style.gridArea = "1 / 1 / -1 / -1";
        videos[i].play();
      }
      this.firstChild.width = this.offsetWidth;
      this.firstChild.height = this.offsetHeight;

    }
    isMaximazed = true;
    //Minimize Tile
  } else {
    for (let i = 0; i < trainingTiles.length; i++) {
      trainingTiles[i].style.display = "inline";
      trainingTiles[i].style.gridArea = "auto";
      trainingTiles[i].firstChild.width = oldTileWidth;
      trainingTiles[i].firstChild.height = oldTileHeight;
      videos[i].pause();
    }
    isMaximazed = false;
  }
}

function addVideosToHTML() {
  //+1 due to rounding errors
  let width = getWidthOfTile(trainingTiles[0].id) + 1;
  let height = getHeightOfTile("grid-item2") + 1;
  if (jsonObject != null) {
    for (let i = 0; i < trainingTiles.length; i++) {
      let id = "grid-item" + (i + startTile);
      let video = document.createElement("video");
      video.setAttribute("width", width);
      video.setAttribute("height", height);

      // video.addEventListener("mouseenter", playVideo);
      // video.addEventListener("mouseleave", pauseVideo);
      // video.setAttribute("autoplay", "");
      video.setAttribute("loop", "");
      video.setAttribute("muted", "");

      let source = document.createElement("source");
      source.setAttribute("src", "resources/videos/webm/" + jsonObject.webms[i].name);
      source.setAttribute("type", "video/webm");
      let element = document.getElementById(id);
      video.appendChild(source);
      element.appendChild(video);
    }
  } else {
    window.setTimeout(addVideosToHTML, 100);
  }
  videos = document.getElementsByTagName("video");
}

function getWidthOfTile(id) {
  let width = document.getElementById(id).offsetWidth;
  return width;
}

function getHeightOfTile(id) {
  let height = document.getElementById(id).offsetHeight;
  return height;
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

function setBackground() {
  if (jsonObject != null) {
    let numberOfBackgrounds = jsonObject.backgrounds.length;
    let randomBackground = Math.floor((Math.random() * numberOfBackgrounds));
    let background = document.getElementById("background");
    background.style.backgroundImage = "url(resources/images/background/" + jsonObject.backgrounds[randomBackground].name + ")";
  } else {
    window.setTimeout(setBackground, 100);
  }
}

function centerTileText() {
  let gridTileHeight = gridItems[0].clientHeight;
  for (let i = 0; i < gridItems.length; i++) {
    gridItems[i].style.lineHeight = gridTileHeight + "px";
  }
}

function loadJSON(path, callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', path, true);
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function generateJSONObject(path) {
  loadJSON(path, function(response) {
    jsonObject = JSON.parse(response);
  });
}
