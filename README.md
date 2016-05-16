# ballot-tally 卌
A lightweight node.js wrapper for the U.S. [AP Elections API 2.x](http://customersupport.ap.org/doc/eln/AP_Elections_API_Developer_Guide.pdf).

Here's a minimal example, which fetches results for Presidential primaries held on April 26, 2016.

```JS
var ballotTally = require('ballot-tally');
var client = new ballotTally('v2', process.env.AP_API_KEY);
var query = new ballotTally.Query.Elections(client, '2016-04-26');

query.level('fipscode').officeID('P').raceType('D').raceType('R')
  .fetch(function(err, data) {
      if (!err) console.log(data);
    });
```

Use this lightweight library to quickly create a script to fetch raw results data from the AP.

For heavy lifting, check out the database-ready library [Elex](https://github.com/newsdev/elex), developed by our friends at The New York Times & NPR.

## Installation

```bash
$ npm install ballot-tally
```

## Usage

1. Get an API key from the AP, then set it as the `AP_API_KEY` environment variable

  ```bash
  $ export AP_API_KEY='your_key_here'
```
2. Create a client object

  ```JS
  var ballotTally = require('ballot-tally');

  var apiKey = process.env.AP_API_KEY;

  var client = new ballotTally('v2', apiKey);
```
3. Create a query builder

  ```JS
  var query = new ballotTally.Query.Elections(client, '2012-11-06');
```
4. Build query to filter results based on criteria

  ```JS
  query.statePostal('FL')
    .test(false)
    .level('fipscode')
    .officeID('P')
    .raceType('G');
```
5. Fetch results

  ```JS
  query.fetch(function(err, data) {
    if (!err) {
      console.log("%j", data);
    }
    else {
      console.error(err);
    }
  });
```

### Raw queries

Instead of using the query builder to fetch results, you can connect to the API with raw queries.

```JS
// This makes a query which is identical to the previous example.

var ballotTally = require('ballot-tally');

var apiKey = process.env.AP_API_KEY;

var client = new ballotTally('v2', apiKey);

client.elections('2012-11-06',
  {
    statepostal: 'FL',
    test: false,
    level: 'fipscode',
    officeID: 'P',
    raceTypeId: 'G'
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
```

### Query options

Query options match with the API filtering parameters. Please refer to [API documentation](http://customersupport.ap.org/doc/eln/AP_Elections_API_Developer_Guide.pdf#Elections) for more information. 

### Common queries
#### Get top level (State) results for Primaries:
```JS
query.level('state').officeID('P').raceType('D').raceType('R')
  .fetch(function(err, data) {
      if (!err) console.log(data);
    });
```

#### Get county level results for Primaries (to render county maps):
```JS
query.level('fipscode').officeID('P').raceType('D').raceType('R')
  .fetch(function(err, data) {
      if (!err) console.log(data);
    });
```

#### Get town level results for New England states (to render town maps):
```JS
query.level('ru').officeID('P').raceType('D').raceType('R')
  .fetch(function(err, data) {
      if (!err) console.log(data);
    });
```

#### Get delegate count for Primaries:
Delegate count is reported only at `district` level for Presidential Primaries.

```JS
query.level('district').officeID('P').raceType('D').raceType('R')
  .fetch(function(err, data) {
      if (!err) console.log(data);
    });
```

#### Get county level results for Presidential General election (to render national maps):
```JS
query.level('fipscode').officeID('P').raceType('G').national(true)
  .fetch(function(err, data) {
      if (!err) console.log(data);
    });
```

#### States where a winner yet to be called for Presidential General election:
```JS
query.level('state').officeID('P').raceType('G').national(true).winner('U')
  .fetch(function(err, data) {
      if (!err) console.log(data);
    });
```

#### U.S. House General elections - results for all districts:
```JS
query.level('district').officeID('H').raceType('G').national(true)
  .fetch(function(err, data) {
      if (!err) console.log(data);
    });
```

### More examples

See the [examples](/examples) directory for further sample scripts.

## Notes
This library was developed independently by The Wall Street Journal. It is not endorsed by Associated Press.

## Version history

v1.0.0 (2016-04-26)

- Initial public release

## License
[ISC](/LICENSE)
