/*
 * sticky-prompt.js: Sticky prompt based on prompt and charm.
 */

var prompt = require('prompt'),
    charm = (require ('charm'))();

charm.pipe(process.stdout);
charm.position(0, process.stdout.rows);

var stickyPrompt = module.exports = {

    prompt: prompt, /* Link to real prompt */

    _stop: false,
    _shown: false,

    get: function(options, callback) {
        this._stop = false;
        this._shown = true;
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
    },
    refresh: function() {
        charm.write(this.prompt.message + ': ');
    },
    log: function(msg) {
        msg += '\n';
        charm.left(100);
        charm.erase("line");
        charm.write(msg);
        this.refresh();
    }

}
