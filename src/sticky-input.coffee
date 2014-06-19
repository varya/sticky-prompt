prompt = require 'prompt'

prompt.start()

cnt = 1

getInput = ()->
  prompt.get [{
    name: 'cont'
    message: 'continue? [Y/n] '
  }], (err, result)->
    console.log cnt
    if result.cont == 'Y'
      cnt++
      setTimeout getInput, 1000

getInput()
