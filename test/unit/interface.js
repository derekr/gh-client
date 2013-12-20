var test    = require('tap').test;

// Setup
var github  = require('../../index');
var client  = github();

// Asset
test('unit', function (t) {
    t.type(github, 'function', 'module should be a function');
    t.type(client, 'function', 'client should be a function');
    t.end();
});
