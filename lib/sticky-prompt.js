/*
 * sticky-prompt.js: Sticky prompt based on prompt and charm.
 */

var prompt = require('prompt'),
    charm = (require ('charm'))();

var stickyPrompt = module.exports = {

    get: function() {
        console.log(arguments)
        prompt.get.apply(this, arguments);
    }

}
