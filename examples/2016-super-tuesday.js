/*
 * Fetch Super Tuesday results from 2016 Presidential race.
 * Get results at county level.
 *
 */
var ballotTally = require('../index.js');

var apiKey = process.env.AP_API_KEY;
var client = new ballotTally('v2', apiKey);

var query = new ballotTally.Query.Elections(client, '2016-03-01');  // Super Tuesday

query
  .level("fipscode")  // County level
  .officeID('P')      // Presidential
  .raceTypeID('D').raceTypeID('R').raceTypeID('E').raceTypeID('S'); // Dem/GOP Caucus/Primary

query.fetch(function(err, data) {
  if (!err) {
    console.log("%j", data);
  }
  else {
    console.error(err);
  }
});
