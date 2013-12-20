var test   = require('tap').test,
    github = require('../../index')();

var buffer = '';
var req = github({
    method: 'GET',
    uri:    '/users/octocat'
});

test('integration', function (t) {
    req.on('data', function (data) {
        buffer += data.toString();
    });

    req.on('end', function () {
        t.type(JSON.parse(buffer), 'object', 'response should be an object');
        t.end();
    });

    req.on('error', function (err) {
        t.equal(err, null, 'errors should be null');
        t.end();
    });
});
