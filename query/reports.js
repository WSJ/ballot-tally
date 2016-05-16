'use strict';

var util = require('util');
var query = require('./query');
var reportsMethods = require('./reports.json');

function Reports(api) {
  Reports.super_.call(this, api, 'reports', reportsMethods);

  return this;
}

util.inherits(Reports, query);

module.exports = Reports;