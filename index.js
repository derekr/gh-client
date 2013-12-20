/**
 * Minimalist github API client
 *
 * @package github
 * @author Derek Reynolds <drk@diy.org>
 */

/**
 * Dependencies
 */
var hyperquest  = require('hyperquest');

/**
 * Returns an API client with the user supplied API key and version target and 
 * authentication.
 *
 * @param {String} API version target (defaults to 'v3')
 * @param {String} 'username:password' or OAuth token. @todo add auth support
 *
 * @return {Object}
 */
module.exports = function (auth, version, host) {
    // Params
    if (typeof version === 'undefined') version = 'v3';
    if (typeof host === 'undefined') host = 'https://api.github.com';

    /**
     * Hyperquest adapter.
     *
     * @param {Object} Options
     *      - method {String}
     *      - uri {String}
     *      - auth {String, Optional} 'username:password'
     *      - token {String, Optional}
     *      - params {Object, Optional}
     * @param {Function} Callback (optional)
     *
     * @return {Object}
     */
    return function (options, callback) {
        // Defaults & storage objects
        var buffer  = '';
        var body    = null;

        if (typeof options === 'string') options = { uri: options };

        options = options || {};

        if (typeof options.method === 'undefined') options.method = 'GET';
        if (typeof options.uri === 'undefined') options.uri = '/';
        if (typeof options.headers === 'undefined') options.headers = {};

        // Host
        options.uri = host + options.uri;

        // Headers
        options.headers['accept'] = 'application/vnd.github.' + version;
        options.headers['accept-type'] = 'application/json';

        if (typeof options.headers['user-agent'] === 'undefined') {
            options.headers['user-agent'] = 'gh-client';
        }

        // Post data
        if (typeof options.params !== 'undefined') {
            body = JSON.stringify(options.params);
            options.headers['content-type'] = 'application/json';
            options.headers['content-length'] = body.length;
            delete options.params;
        }

        // Create hyperquest object
        var request = hyperquest(options);

        // Send post data
        if (body !== null) {
            request.write(body);
        }

        // If no callback is provided, return hyperquest object
        if (typeof callback === 'undefined') return request;

        // Callback handler
        request.on('error', function (err) {
            return callback(err);
        });

        request.on('data', function (data) {
            buffer += data.toString();
        });

        request.on('end', function (data) {
            try {
                callback(null, JSON.parse(buffer));
            } catch (e) {
                callback(e);
            }
        });
    }
}
