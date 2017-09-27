'use strict'

const Context = require('../context')

class Test {
  constructor (executor) {
    this.executor = executor
  }

  async given (ctx) {
    console.log('given:')
    const runner = new Context(this)
    await ctx(runner)
  }

  async expect (ctx) {
    console.log('expect:')
    const runner = new Context(this)
    ctx(runner)
  }
}

module.exports = Test