define(['should', 'src/quicksort'], function(should, quickSort){
  'use strict';

  describe('InPlace Quicksort algoryth', function(){

    it('should return null for null/undefined/non-array argument', function(){
      should.not.exist(quickSort(null));
      should.not.exist(quickSort());
      should.not.exist(quickSort({}));
      should.not.exist(quickSort('non-array'));
    })

    it('should return empty array for empty array argument', function(){
      quickSort([]).should.be.deep.equal([]);
    });

    it('should return single item array array for empty single item argument', function(){
      quickSort([3]).should.be.deep.equal([3]);
    });

    it('should swap non-ordered array of two elements', function(){
      var array = [4, 2];
      quickSort(array);
      array.should.be.deep.equal([2, 4]);
    });

    it('should not swap ordered array of two elements', function(){
      var array = [2, 4];
      quickSort(array);
      array.should.be.deep.equal([2, 4]);
    });


    it('should sort array of 3 elements', function(){
      var array = [4, 2, 3];
      quickSort(array);
      array.should.be.deep.equal([2, 3, 4]);
    });

    it('should sort array sorted in descendent order', function(){
      var array = [6, 5, 3, 2, 0];
      quickSort(array);
      array.should.be.deep.equal([0, 2, 3, 5, 6]);
    });


    it('should sort bigger array', function(){
      var array = [4, 2, 3, 7, 1, 10, 3, 5, 13, 7, 0, -5];
      quickSort(array);
      array.should.be.deep.equal([-5, 0, 1, 2, 3, 3, 4, 5, 7, 7, 10, 13]);
    });

    it('should keep presorted array', function(){
      var array = ([-5, 0, 1, 2, 3, 3, 4, 5, 7, 7, 10, 13]);
      quickSort(array);
      array.should.be.deep.equal([-5, 0, 1, 2, 3, 3, 4, 5, 7, 7, 10, 13]);
    });

  });

});
