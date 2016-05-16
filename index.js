'use strict';

var util = require('util');
var wrapi = require('wrapi');

var endpoints = require('./api/ap-elections.json');

function BallotTally(version, apiKey) {

  var opts = {
    qs: {
      apikey: apiKey,
      format: 'json'
    },
    headers: {
      'User-Agent': 'WSJ-BallotTally',
      'Accept': 'application/json'
    }
  };

  BallotTally.super_.call(this,
            'https://api.ap.org/' + version + '/',
            endpoints,
            opts);

};

util.inherits(BallotTally, wrapi);
module.exports = BallotTally;

// Fluent interface Query Builders
module.exports.Query = {
  Elections: require('./query/elections.js'),
  Reports: require('./query/reports.js')
};
