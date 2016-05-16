'use strict';

function Query(api, ep, methods) {
  this._api = api;
  this._endpoint = ep;
  this._params = [];
  this._qs = {};

  if (methods) {
    // Create supported methods
    var self = this;

    for (var m in methods) {
      // Register fluent methods with the keys
      (function (name, method) {
        self[name] = function(val) {
          var q = method.param || name;
          if ('add' === method.method) {  // Array
            if (!self._qs[q]) {
              self._qs[q] = [val];
            }
            else {
              self._qs[q].push(val);
            }
          }
          else {
            // val could be `false`
            self._qs[q] = (method.default && val == undefined) ? method.default : val;
          }
          return self;  // Fluent
        };

        // Alias?
        if (method.alias) {
          self[method.alias] = self[name];
        }
      })(m, methods[m]);  // iife

    } // for

  }
}

Query.prototype._queryString = function() {
  var qs = {};
  for (var q in this._qs) {
    qs[q] = this._qs[q];
    if (Array.isArray(qs[q])) {
      qs[q] = qs[q].join(',');
    }
  }
  return require('querystring').stringify(qs);
};

Query.prototype.fetch = function(cb) {
  for (var q in this._qs) {
    if (Array.isArray(this._qs[q])) {
      this._qs[q] = this._qs[q].join(',');
    }
  }
  var args = this._params.concat(this._qs);
  if (cb) {
    args.push(cb);
  }
  return this._api[this._endpoint].apply(this, args);
};

module.exports = Query;
