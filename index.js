'use strict';

var generate = require('le-tls-sni').generate;

module.exports.create = function (defaults) {
  var challenges = {};

  var handlers = {
    getOptions: function () {
      return defaults;
    }

  , set: function (args, domain, token, secret, cb) {
      if (!args.sni || !args.sni.cacheCerts || !args.sni.uncacheCerts) {
         cb(new Error("incompatible SNI handler"));
      }
      generate(args, domain, token, secret, function (err, certs) {
        if (err) {
          cb(err);
          return;
        }
        certs.auto = false;
        args.sni.cacheCerts(certs);
        challenges[token] = {
          subject: certs.subject
        , altnames: certs.altnames
        , sni: args.sni
        };
        cb(null);
      });
    }

  , get: function (args, domain, token, cb) {
      throw new Error("Challenge.get() has no implementation for standalone/express.");
    }

  , remove: function (args, domain, token, cb) {
      var certs = challenges[token];
      if (certs) {
        delete challenges[token];
        var sni = certs.sni;
        delete certs.sni;
        sni.uncacheCerts(certs);
      }
      cb(null);
    }
  };

  return handlers;
};
