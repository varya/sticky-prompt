prompt = require 'prompt'

prompt.start()

prompt.get ['command'], ()->
  console.log 'I got it'
