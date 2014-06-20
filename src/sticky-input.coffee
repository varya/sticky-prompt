prompt = require 'prompt'
chalk = require "chalk"
charm = (require "charm")()

charm.pipe process.stdout
prompt.start()
prompt.message = "#{chalk.cyan("Varya")} #{chalk.magenta("StickyPrompt")}"
charm.position 0, (process.stdout.rows)

cnt = 1

write = (msg)->
  msg += '\n'
  charm.left(100)
  charm.erase("line")
  charm.write msg
  prompt.emit('prompt')
  getInput()

refresh = ()->
 charm.write "#{prompt.message}: #{chalk.grey(asking + ':')} "

asking = 'countinue? [Y/n]'
promptShown = false

getInput = ()->
  charm.erase("line")
  charm.left(100)
  if promptShown
    refresh()
    return
  promptShown = true
  prompt.get [{
    name: 'cont'
    message: asking
  }], (err, result)->
    # Erase input line
    charm.up(1)
    charm.erase("line")

    promptShown = false
    if result.cont == 'Y'
      showCnt cnt++
      setTimeout getInput, 1000
    else
     process.exit()

showCnt = (n)->
  for i in [1..n*2]
    setTimeout ((m)->
      return ()->
        write m
      )(i), i*500

getInput()
