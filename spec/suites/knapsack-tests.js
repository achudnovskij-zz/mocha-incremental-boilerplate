define(['should', 'src/knapsack'], function (should, knapsack) {

  describe('Knapsack problem solution', function () {

    it('Should work for trivial case', function () {
      var items = [{
          weigth: 4,
          value: 10
        }, {
          weigth: 2,
          value: 6
        }, {
          weigth: 5,
          value: 7
        }, {
          weigth: 2,
          value: 3
        }],
        result = knapsack(items, 10);
      result.should.contain(items[0]);
      result.should.contain(items[1]);
      result.should.contain(items[3]);
      result.length.should.be.equal(3);
    });

    it('Should work if just a single item can be put', function () {
      var items = [{
          weigth: 6,
          value: 10
        }, {
          weigth: 7,
          value: 9
        }, {
          weigth: 9,
          value: 11
        }, {
          weigth: 11,
          value: 13
        }],
        result = knapsack(items, 10);
      result.should.be.deep.equal([items[2]]);

    });

    it('Should work if everything can be put', function () {
      var items = [{
          weigth: 3,
          value: 2
        }, {
          weigth: 3,
          value: 4
        }, {
          weigth: 2,
          value: 1
        }, {
          weigth: 5,
          value: 10
        }],
        result = knapsack(items, 15);
      result.length.should.be.equal(4);
      result.should.have.members(items);
    });

    it('Should work for regular case', function () {
      var items = [{
        weigth: 5,
        value: 7
      }, {
        weigth: 5,
        value: 6
      }, {
        weigth: 2,
        value: 4
      }, {
        weigth: 3,
        value: 3
      }, {
        weigth: 4,
        value: 4
      }, {
        weigth: 1,
        value: 2
      }, {
        weigth: 1,
        value: 3
      }, {
        weigth: 6,
        value: 8
      }];
      knapsack(items, 18).should.have.members([items[0], items[2], items[3], items[5], items[6], items[7]]);
    });
  });

});
