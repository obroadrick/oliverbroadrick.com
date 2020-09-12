//DEFINE CONSTANTS
const COLOR_1 = "#222222";
const COLOR_2 = "#999999";
const COLOR_3 = "#AAAAAA";
const BACK_COLOR = "#808080";

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
  switch (document.getElementById("algorithm").value) {
    case "selection":
      sorter = new SelectionSorter(array, speed);
      break;
    case "bubble":
      sorter = new BubbleSorter(array, speed);
      break;
    case "insertion":
      sorter = new InsertionSorter(array,speed);
      break;
  }
  sorter.beginSorting();
}

//DRAW THE ARRAY
function drawArray() {
  let color_2_num = -1;
  let color_3_num = -1;
  let color_4_num = -1;
  switch (sorter.name) {
    case "selection":
      color_2_num = sorter.innerIndex;
      color_3_num = sorter.outerIndex;
      break;
    case "bubble":
      color_2_num = sorter.index;
      break;
    case "insertion":
      color_2_num = sorter.i;
      color_3_num = sorter.j;
      break;
  }
  let arrayLength = sorter.array.length;

  for (let i = 0; i < arrayLength; i++){
    ctx.fillStyle = "#000000";
    if (i == color_2_num) {
      ctx.fillStyle = COLOR_2;
    } else if (i == color_3_num) {
      ctx.fillStyle = COLOR_3;
    }
    ctx.fillRect(i/arrayLength*canvas.width,canvas.height,canvas.width/arrayLength + .5,-sorter.array[i]);
  }
}

//GENERATE AN ARRAY FOR SORTING
function generateArray(numberOfElements, minValue, maxValue) {
  let array = [];
  for (let i=0; i<numberOfElements; i++){
    array[i] = Math.ceil(Math.random()*canvas.height);
  }
  return array;
}

//CONSTRUCTOR FOR SELECTION SORTER OBJECT
function SelectionSorter(passed_array, speed) {
  this.name = "selection";
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

//CONSTRUCTOR FOR BUBBLE SORTER OBJECT
function BubbleSorter(passed_array, speed) {
  this.name = "bubble";
  this.array = passed_array;
  this.index = 0;
  this.arrayLength = this.array.length;
  this.id;
  this.hasSwapped = false;
  var self = this;

  //FUNCTION WHICH CAUSES THE SORTING TO BEGIN
  this.beginSorting = function() {
    self.id = setInterval(this.progressSortOnce, speed);
  };

  //MAKE ONE PROGRESSION OF BUBBLE SORT
  this.progressSortOnce = function() {
    //HANDLE THE UPPER BOUND OF THE INDEX
    if (self.index == self.arrayLength) {
      if (!hasSwapped) {
        clearInterval(self.id);
        return;
      } else {
        self.index = 0;
        hasSwapped = false;
      }
    } 
    if (self.array[self.index] > self.array[self.index+1]) {
      //SWAP
      let temp = self.array[self.index];
      self.array[self.index] = self.array[self.index+1];
      self.array[self.index+1] = temp;
      //SET SWAP VARIABLE
      hasSwapped = true;
    }
    //INCREASE INDEX
    self.index++;
  };
}

//CONSTRUCTOR FOR INSERTION SORTER OBJECT
function InsertionSorter(passed_array, speed) {
  this.name = "insertion";
  this.array = passed_array;
  this.i = 1;
  this.j = 1;
  this.arrayLength = this.array.length;
  this.id;
  this.hasSwapped = false;
  var self = this;

  //FUNCTION WHICH CAUSES THE SORTING TO BEGIN
  this.beginSorting = function() {
    self.id = setInterval(this.progressSortOnce, speed);
  };

  //MAKE ONE PROGRESSION OF BUBBLE SORT
  this.progressSortOnce = function() {
    //HANDLE THE BOUNDS OF THE INDICES
    if (self.i == self.arrayLength) {
      clearInterval(self.id);
      return;
    }
    if (self.j == 0 || self.array[self.j-1] <= self.array[self.j]) {
      //SET INDICES
      self.i++;
      self.j = self.i;
    } else {
      //SWAP
      let temp = self.array[self.j];
      self.array[self.j] = self.array[self.j-1];
      self.array[self.j-1] = temp;
      //DECREMENT INDEX
      self.j--;
    }
  };
}
