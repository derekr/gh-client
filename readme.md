# gh-client
#### Minimal streaming client for the github API

[![Build Status](https://travis-ci.org/derekr/github-client.png?branch=master)](https://travis-ci.org/derekr/github-client)

# Usage

```js
var github = require('gh-client')();
var request = github({
    method: 'GET',
    uri:    '/users/octocat'
}).pipe(process.stdout);

request.on('error', function (err) {
    // Oh noes! 
});
```
