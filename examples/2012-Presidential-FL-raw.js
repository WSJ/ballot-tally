/*
 * Raw query.
 *
 * Fetch results from 2012 Presidential race - (General Election) from Florida.
 * Get results at county level.
 *
 */
var ballotTally = require('../index');

var apiKey = process.env.AP_API_KEY;

var client = new ballotTally('v2', apiKey);

client.elections('2012-11-06',  // Election Date
  {
    statepostal: 'FL',          // Florida State
    test: false,                // Not test data
    level: 'fipscode',          // County level
    officeID: 'P',              // Office of the President
    raceTypeId: 'G'             // General Election
  },
  function(err, data) {
    if (!err) {
      console.log("%j", data);
    }
    else {
      console.error(err);
    }
  }
);