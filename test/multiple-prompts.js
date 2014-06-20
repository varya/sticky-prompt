var prompt = new (require('../lib/sticky-prompt.js'))();
var chalk = require('chalk');

prompt.prompt.message = chalk.cyan("Varya") + ' ' + chalk.magenta("StickyPrompt");

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
        redraw: '',
        next: function() {
            var prompt2 = new (require('../lib/sticky-prompt.js'))();
            prompt2.prompt.message = chalk.cyan("Another") + ' ' + chalk.magenta("StickyPrompt");
            prompt2.get([
                { name: 'xxx', message: 'Prompt2' }
            ], function(){
                prompt2.log('prompt2');
            });
        }
    }
);

var showCount = function(n) {
    for (var i = 0; i < n; i++) (function(i) {
        setTimeout(function() {
            prompt.log(i);
        }, i*1000);
    })(i);
}
