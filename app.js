'use strict'
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const size = 1000;
const scale = 5;
const resolution = size / scale;

// for 2d array
let element;

function setup() {
  canvas.width = size;
  canvas.height = size;
  context.scale(scale, scale);
  context.fillStyle = 'black';
  context.fillRect(50, 50, 1, 1)

  element = createElement();
}

setup();

function randomise() {
  for(let i = 0; i < resolution; i++) {
    for(let j = 0; j < resolution; j++) {
      if(Math.floor(Math.random() * 2))
        element[i][j] = 1;
    }
  }
}

randomise();

function createElement() {
  let arr = new Array(resolution);
  for(let i = 0; i < arr.length; i++) {
    arr[i] = new Array(resolution);
  }

  for(let i = 0; i < arr.length; i++) {
    for(let j = 0; j < arr.length; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}

function draw() {
  context.fillStyle = 'white';
  context.fillRect(0, 0, resolution, resolution);
  context.fillStyle = 'black';
  for(let i = 0; i < resolution; i++) {
    for(let j = 0; j < resolution; j++) {
      if(element[i][j])
        context.fillRect(i, j, 1, 1);
    }
  }
}


draw();


function step() {
  let newElements = createElement();
  for(let i = 0; i < resolution; i++) {
    for(let j = 0; j < resolution; j++) {
      const neighbourNum = getNeighbour(i, j);

      if(element[i][j] && neighbourNum >= 2 && neighbourNum <= 3)
        newElements[i][j] = 1;

      else if(!element[i][j] && neighbourNum === 3)
        newElements[i][j] = 1;
    }
  }
  element = newElements;
  draw();
}

setInterval(step, 50);


function getNeighbour(x, y) {
  let count = 0;
  for(let ii = -1; ii < 2; ii++) {
    for(let jj = -1; jj < 2; jj++) {
      if(ii === 0 && jj === 0)
        continue;

      if(x + ii < 0 || x + ii > (resolution - 1))
        continue;

      if(y + jj < 0 || y + jj > (resolution - 1))
        continue;

      if(element[x + ii][y + jj])
        count++;
    }
  }
  return count;
}
console.log(getNeighbour(0, 0));

console.log(element);
