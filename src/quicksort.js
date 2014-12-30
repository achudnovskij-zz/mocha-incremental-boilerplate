define(['underscore'], function (_) {

  'use strict';

  var quickSort = function (array) {
    if (!_.isArray(array)) {
      return null;
    }

    step(array, 0, array.length - 1);

    return array;
  };

  function step(array, left, right) {
    if (right - left < 1) {
      return;
    }
    var middle = partition(array, left, right);
    step(array, left, middle - 1);
    step(array, middle, right);
  };

  function partition(array, left, right) {
    var pivot = array[right],
      leftPointer = left,
      rightPointer = right - 1;
    while (leftPointer <= rightPointer) {
      if (array[leftPointer] > pivot && array[rightPointer] < pivot) {
        swap(array, leftPointer, rightPointer);
      } else if (array[leftPointer] <= pivot) {
        leftPointer++;
      } else if (array[rightPointer] >= pivot) {
        rightPointer--;
      }
    }
    if (leftPointer !== right) {
      swap(array, leftPointer, right);
    }
    return leftPointer;
  };

  function swap(array, left, right) {
    var temp = array[right];
    array[right] = array[left];
    array[left] = temp;
  };

  return quickSort;

});
