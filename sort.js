//DEFINE CONSTANTS
const COLOR_1 = "#222222";
const COLOR_2 = "#999999";
const COLOR_3 = "#AAAAAA";

//GET CANVAS AND CONTEXT VARS
var canvas = document.getElementById("sortingCanvas");
var ctx = canvas.getContext("2d");

//BEGIN SORTING
var sorter;
sort();

//INITIATE DRAWING/ANIMATION LOOP
window.requestAnimationFrame(drawLoop);

//MAIN ANIMATION LOOP
function drawLoop() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  drawArray(sorter);
  window.requestAnimationFrame(drawLoop);
}

//BEGINS THE SORTING
function sort() {
  let numberOfElements = document.getElementById("numElements").value;
  if (numberOfElements < 0) {
    document.getElementById("numElements").value = 80;
    numberOfElements = 80;
  }
  let minValue = 0;
  let maxValue = canvas.height;
  let array = generateArray(numberOfElements, minValue, maxValue);
  let speed = Math.floor(1641*Math.pow(2.71828,-0.802*document.getElementById("speed").value));
console.log(speed);
  let selectionSorter = new SelectionSorter(array, speed);
  selectionSorter.beginSorting();
  sorter = selectionSorter;
}

//DRAW THE ARRAY
function drawArray() {
  let arrayLength = sorter.array.length;
  let innerIndex = sorter.innerIndex;
  let outerIndex = sorter.outerIndex;
  for (let i = 0; i < arrayLength; i++){
    ctx.fillStyle = COLOR_1;
    if (i == innerIndex) {
      ctx.fillStyle = COLOR_2;
    } else if (i == outerIndex) {
      ctx.fillStyle = COLOR_3;
    }
    ctx.fillRect(i/arrayLength*canvas.width,canvas.height,canvas.width/arrayLength,-sorter.array[i]);
  }
}

//GENERATE AN ARRAY FOR SORTING
function generateArray(numberOfElements, minValue, maxValue) {
  let array = [];
  for (let i=0; i<numberOfElements; i++){
    array[i] = Math.floor(Math.random()*canvas.height);
  }
  return array;
}

//CONSTRUCTOR FOR SELECTION SORTER OBJECT
function SelectionSorter(passed_array, speed) {
  this.array = passed_array;
  this.outerIndex = 0;
  this.innerIndex = 0;
  this.arrayLength = this.array.length;
  this.minimumIndex = 0;
  this.minimumValue = this.array[0];
  this.currentValue = 0;
  this.id;
  var self = this;

  //FUNCTION WHICH CAUSES THE SORTING TO BEGIN
  this.beginSorting = function() {
    self.id = setInterval(this.progressSortOnce, speed);
  };

  //MAKE ONE PROGRESSION OF SELECTION SORT
  this.progressSortOnce = function() {
    //HANDLE THE UPPER BOUND OF THE INDICES
    if (self.outerIndex >= self.arrayLength) {
      clearInterval(self.id);
      return;
    }
    if (self.innerIndex == self.arrayLength) {
      //SWAP
      let temp = self.array[self.outerIndex];
      self.array[self.outerIndex] = self.array[self.minimumIndex];
      self.array[self.minimumIndex] = temp;
      //SET INDICES AND MIN VARIABLES
      self.outerIndex++;
      self.minimumIndex = self.outerIndex;
      self.minimumValue = self.array[self.minimumIndex];
      self.innerIndex = self.outerIndex; 
    }
    //COMPARE CURRENT VALUE TO MINIMUM AND UPDATE IF SMALLER
    if (self.array[self.innerIndex] < self.minimumValue) {
      self.minimumIndex = self.innerIndex;
      self.minimumValue = self.array[self.innerIndex];
    }
    //INCREASE INDICES
    self.innerIndex++;
  };
}

//CONSTRUCTOR FOR SELECTION SORTER OBJECT
function BubbleSorter(passed_array) {
  this.array = passed_array;
  this.outerIndex = 0;
  this.innerIndex = 0;
  this.arrayLength = this.array.length;
  this.minimumIndex = 0;
  this.minimumValue = this.array[0];
  this.currentValue = 0;
  this.id;
  var self = this;

  //FUNCTION WHICH CAUSES THE SORTING TO BEGIN
  this.beginSorting = function() {
    self.id = setInterval(this.progressSortOnce, 10);
  };

  //MAKE ONE PROGRESSION OF SELECTION SORT
  this.progressSortOnce = function() {
    //HANDLE THE UPPER BOUND OF THE INDICES
    if (self.outerIndex >= self.arrayLength) {
      clearInterval(self.id);
      return;
    }
    if (self.innerIndex == self.arrayLength) {
      //SWAP
      let temp = self.array[self.outerIndex];
      self.array[self.outerIndex] = self.array[self.minimumIndex];
      self.array[self.minimumIndex] = temp;
      //SET INDICES AND MIN VARIABLES
      self.outerIndex++;
      self.minimumIndex = self.outerIndex;
      self.minimumValue = self.array[self.minimumIndex];
      self.innerIndex = self.outerIndex; 
    }
    //COMPARE CURRENT VALUE TO MINIMUM AND UPDATE IF SMALLER
    if (self.array[self.innerIndex] < self.minimumValue) {
      self.minimumIndex = self.innerIndex;
      self.minimumValue = self.array[self.innerIndex];
    }
    //INCREASE INDICES
    self.innerIndex++;
  };
}