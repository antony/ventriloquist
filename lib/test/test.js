'use strict'

const Context = require('../context')

class Test {
  constructor (executor) {
    this.executor = executor
  }

  async given (ctx) {
    console.log('given:')
    this.context = new Context(this)
    await ctx(this.context)
  }

  async expect (ctx) {
    console.log('expect:')
    await ctx(this.context)
  }
}

module.exports = Test