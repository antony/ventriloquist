'use strict'

const Test = require('../test')

class Executor {
  constructor (browser, config) {
    this.config = config
    this.browser = browser
  }

  async test (testName, test) {
    console.log(`Running test ${testName}`)
    const runner = new Test(this)
    try {
      await test(runner)
      console.log(`✔ ${testName}`)
    } catch (e) {
      console.log(`❌ ${testName}`, ':', e.message)
    }
  }
}

module.exports = Executor