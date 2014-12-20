#!/usr/bin/env node --stack-size=65536
'use strict';
var comparator = require('func-comparator');
var _ = require('lodash');
var async = require('async');
var neo_async = require('../../');

// roop count
var count = 10;
// sampling times
var times = 300;
var array = _.sample(_.times(count), count);
var iterator = function(total, n, callback) {
  callback(null, total + n);
};
var funcs = {
  'async': function(callback) {
    async.reduceRight(array, 0, iterator, callback);
  },
  'neo-async': function(callback) {
    neo_async.reduceRight(array, 0, iterator, callback);
  }
};

comparator
.set(funcs)
.option({
  async: true,
  times: times
})
.start()
.result(function(err, res) {
  console.log(res);
});

