le-challenge-sni
================

A strategy for node-letsencrypt for setting, retrieving, and clearing ACME
challenges by registering self-signed certs with the SNI handler.

It is designed to handle tls-sni-01 and tls-sni-02 challenges.

Install
-------

```bash
npm install --save le-challenge-sni@2.x
```

Usage
-----

```javascript
var leChallenge = require('le-challenge-sni').create({
  debug: false
});

var LE = require('letsencrypt');

LE.create({
  server: LE.stagingServerUrl
, challenge: leChallenge
});
```

Exposed Methods
---------------

For ACME Challenge:

* `set(opts, domain, key, val, done)`
* `get(defaults, domain, key, done)`
* `remove(defaults, domain, key, done)`

For node-letsencrypt internals:

* `getOptions()` returns the user supplied options, if any (no effect)
