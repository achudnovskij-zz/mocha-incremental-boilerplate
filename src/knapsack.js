define(['underscore'], function (_) {

  'use strict';

  function getCacheKey(items, capacity) {
    return capacity + ':' + _.map(items, function (item) {
      return item.weight + '-' + item.value;
    }).join(',');
  }

  function knapsack(items, capacity) {

    var calls = 0,
      cache = {};

    function step(items, capacity) {
      var cacheKey = getCacheKey(items, capacity),
        bestSolution = {
          value: 0,
          items: []
        };
      if (!cache[cacheKey]) {
        _.each(items, function (item) {
          if (item.weigth > capacity) {
            return;
          }
          var childSolution = step(_.without(items, item), capacity - item.weigth),
            solution = {
              value: item.value + childSolution.value,
              items: [item].concat(childSolution.items)
            };
          if (solution.value > bestSolution.value) {
            bestSolution = solution;
          }
        });
        calls = calls + 1;
        cache[cacheKey] = bestSolution;
      }
      return cache[cacheKey];
    }

    return step(items, capacity).items;
  }

  return knapsack;

});
