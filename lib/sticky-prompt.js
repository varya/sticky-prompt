/*
 * sticky-prompt.js: Sticky prompt based on prompt and charm.
 */

var prompt = require('prompt'),
    charm = (require ('charm'))(),
    chalk = require('chalk');

charm.pipe(process.stdout);
charm.position(0, process.stdout.rows);

var currentPrompt;

prompt.on('prompt', function(options){
    /* new thing asked */
    currentPrompt = options.schema;
});

var stickyPrompt = function() {
    this._stop = false;
    this._shown = false;
    this._options = {};
    this.next = 'single';
};

stickyPrompt.prototype = {

    prompt: prompt, /* Link to real prompt */

    get: function(options, callback, tune) {
        tune = tune || {};
        this._options = options;
        this._stop = false;
        this._shown = true;
        this.next = tune.next || this.next;
        var that = this;
        var initialArgs = arguments;
        var newCallback = function() {
            callback.apply(prompt, arguments);
            if (that.next == 'cycle' && !that._stop) {
                that.get.apply(that, initialArgs);
            }
            if (typeof that.next == 'function') {
                console.log('we call next here');
                that.next();
            }
        }
        prompt.get(options, newCallback);
    },
    stop: function() {
        this._stop = true;
    },
    refresh: function() {
        charm.write(this.prompt.message + ': ' + chalk.grey(currentPrompt.description + ':  '));
    },
    log: function(msg) {
        msg += '\n';
        charm.left(100);
        charm.erase("line");
        charm.write(msg);
        if (this.next) {
            this.refresh();
        }
    }

}

module.exports = stickyPrompt;
