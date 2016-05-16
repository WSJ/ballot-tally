var ballotTally = require('../index.js');

var apiKey = process.env.AP_API_KEY;
var client = new ballotTally('v2', apiKey);

var query = new ballotTally.Query.Elections(client, '2012-11-06');

var _ = require('lodash');
query
  .test(false)
  .level("fipscode")
  .officeID('P')
  .raceTypeID('G');

query.fetch(function(err, data) {
  if (!err) {
    var raceData = _.reduce(data.races, 
      function(acc, r) {
        acc[r.reportingUnits[0].statePostal] = parseRace(r);
        return acc;
      },
      {}
    );

    console.log("%j", raceData);
  }
  else {
    console.error(err);
  }
});




function parseRace(race) {
  var stateData = _.reduce(race.reportingUnits,
    function(acc, ru) {
      var fipscode = ru.fipsCode || ru.statePostal;
      var data = {
        pr: ru.precinctsReporting,
        tp: ru.precinctsTotal,
        tv: 0,
        status: 'na',
        cand: []
      };

      // Order by `winner` & `voteCount`
      var candidates = _.orderBy(ru.candidates,
        ['winner', 'voteCount'],
        ['desc', 'desc']
      );
      data = _.reduce(ru.candidates,
        function(accCand, c) {
          accCand.cand.push({
            name: c.last,
            party: c.party,
            votes: c.voteCount,
            winner: c.winner
          });
          accCand.tv += c.voteCount;
          return accCand;
        },
        data
      );

      if (ru.candidates.length > 0) {
        var status = ru.candidates[0].party == 'GOP' ? 'R' : (ru.candidates[0].party == 'Dem' ? 'D' : 'O');
        if (ru.candidates[0].winner == 'X') {
          status = status + 'W'; 
        }
        else if (ru.candidates[0].voteCount == 0) {
          status = 'na';
        }
        else if (ru.candidates.length > 1 && ru.candidates[0].voteCount == ru.candidates[1].voteCount) {
          status = 'T'
        }
        else {
          status = status + 'L';
        }
        data.status = status;
      }

      acc[fipscode] = data;
      return acc;
    },
    {});

  return stateData;
}