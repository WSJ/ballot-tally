/*
 * Fetch results from all races for election on April 26, 2016
 *
 */
var ballotTally = require('../index.js');
var client = new ballotTally('v2', process.env.AP_API_KEY);
var query = new ballotTally.Query.Elections(client, '2016-04-26');

/*
 * To fetch county level results for Presidential Primaries only, 
 * 1. set level to 'fipscode'
 * 2. set officeID to 'P' (President)
 * 3. set raceType to 'D' (Democratic Primary) & 'R' (Republican Primary)
 *
 * query.level('fipscode').officeID('P').raceType('D').raceType('R')
 */
 
query
  .fetch(function(err, data) {
      if (!err) console.log(data);
    });
