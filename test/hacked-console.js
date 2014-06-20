var prompt = new (require('../lib/sticky-prompt.js'))();
var chalk = require('chalk');

prompt.prompt.message = chalk.cyan("Varya") + ' ' + chalk.magenta("StickyPrompt");

prompt.consoleHackEnable();

prompt.get([
    {
        name: 'cont',
        message: 'countinue? [number/n]'
    }
    ], function(err, res) {
        if (res.cont == 'n') {
            prompt.stop();
            return;
        }
        showCount(res.cont);
    },
    {
        next: 'cycle',
        redraw: ' '
    }
);

var showCount = function(n) {
    for (var i = 0; i < n; i++) (function(i) {
        setTimeout(function() {
            console.log(i, '*');
        }, i*1000);
    })(i);
}
