/*
 * sticky-prompt.js: Sticky prompt based on prompt and charm.
 */

var prompt = require('prompt'),
    charm = (require ('charm'))();

var stickyPrompt = module.exports = {

    _stop: false,

    get: function(options, callback) {
        this._stop = false;
        var initialArgs = arguments;
        var newCallback = function() {
            callback.apply(prompt, arguments);
            if (!stickyPrompt._stop) {
                stickyPrompt.get.apply(stickyPrompt, initialArgs);
            }
        }
        prompt.get(options, newCallback);
    },
    stop: function() {
        this._stop = true;
    }

}
