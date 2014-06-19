prompt = require 'prompt'
charm = (require "charm")()

charm.pipe process.stdout
prompt.start()
charm.position 0, (process.stdout.rows - 1)

cnt = 1

getInput = ()->
  prompt.get [{
    name: 'cont'
    message: 'continue? [Y/n] '
  }], (err, result)->
    console.log cnt
    if result.cont == 'Y'
      showCnt cnt++
      setTimeout getInput, 1000

showCnt = (n)->
  for i in [1..n]
    setTimeout (()->
      console.log i), i*500

getInput()
