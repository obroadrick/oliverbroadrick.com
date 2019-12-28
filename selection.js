//CONSTRUCTOR FOR SELECTION SORTER OBJECT
function SelectionSorter(passed_array) {
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