/*
 * sticky-prompt.js: Sticky prompt based on prompt and charm.
 */

var prompt = require('prompt'),
    charm = (require ('charm'))();

var stickyPrompt = module.exports = {

    get: function(options, callback) {
        var initialArgs = arguments;
        var newCallback = function() {
            callback();
            stickyPrompt.get.apply(stickyPrompt, initialArgs);
        }
        prompt.get(options, newCallback);
    }

}
