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

var oldConsole = console.log;

stickyPrompt.prototype = {

    prompt: prompt, /* Link to real prompt */

    consoleHackEnable: function() {
        var that = this;
        console.log = function() {
            that.log.apply(that, arguments);
        }
    },
    consoleHackDisable: function() {
        console.log = function() {
            oldConsole.apply(global, arguments);
        }
    },

    get: function(options, callback, tune) {
        tune = tune || {};
        this._options = options;
        this._stop = false;
        this._shown = true;
        this.next = tune.next || this.next;
        var that = this;
        var initialArgs = arguments;
        var newCallback = function() {
            if (tune.redraw) {
                charm.up(1);
                charm.erase('line');
                that.log(tune.redraw);
            }
            callback.apply(prompt, arguments);
            if (that.next == 'cycle' && !that._stop) {
                that.get.apply(that, initialArgs);
            }
            if (typeof that.next == 'function') {
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
        //msg += '\n';
        charm.left(100);
        charm.erase("line");
        var argumentsArray = [].slice.apply(arguments);
        argumentsArray.forEach(function(val){
            charm.write(val + ' ');
        });
        charm.write('\n');
        if (this.next) {
            this.refresh();
        }
    }

}

module.exports = stickyPrompt;
