var test    = require('tap').test,
    github  = require('../../index')();

github({
    method: 'GET',
    uri:    '/users/octocat'
}, function (err, body) {
    test('integration', function (t) {
        t.equal(err, null, 'errors should be null');
        t.type(body, 'object', 'response body should be an object');
        t.end();
    });
});
