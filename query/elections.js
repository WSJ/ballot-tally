'use strict';

var util = require('util');
var query = require('./query');
var electionMethods = require('./elections.json');

function Elections(api, date) {
  Elections.super_.call(this, api, 'elections', electionMethods);
  this._params = [date];

  return this;
}

util.inherits(Elections, query);

module.exports = Elections;