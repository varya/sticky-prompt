prompt = require 'prompt'

prompt.start()

getInput = ()->
  prompt.get ['continue? [Y/n] '], (err, result)->
    console.log 'I got it'
    console.log result§

getInput()
