/*
 * Fetch results from 2012 Presidential race - (General Election) from Florida.
 * Get results at county level.
 *
 */
var ballotTally = require('../index.js');

var apiKey = process.env.AP_API_KEY;
var client = new ballotTally('v2', apiKey);

var query = new ballotTally.Query.Elections(client, '2012-11-06');  // Election Date

query
  .statePostal('FL')    // Florida State
  .test(false)          // Not test data
  .level("fipscode")    // County level
  .officeID('P')        // Office of the President
  .raceTypeID('G');     // General Election

query.fetch(function(err, data) {
  if (!err) {
    console.log("%j", data);
  }
  else {
    console.error(err);
  }
});
