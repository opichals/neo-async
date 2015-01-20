#!/usr/bin/env node --stack-size=65536
'use strict';
var comparator = require('func-comparator');
var _ = require('lodash');
var async = require('async');
var neo_async = require('../../');

// loop count
var count = 10;
// sampling times
var times = 300;
var array = _.shuffle(_.times(count));
var c = 0;
var iterator = function(n, callback) {
  c++;
  callback();
};
var funcs = {
  'async': function(callback) {
    c = 0;
    async.eachLimit(array, 4, iterator, callback);
  },
  'neo-async': function(callback) {
    c = 0;
    neo_async.eachLimit(array, 4, iterator, callback);
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


