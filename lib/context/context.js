'use strict'

const { expect } = require('code')

class Context {
  constructor (test) {
    this.test = test
  }

  async to (ViewClass) {
    const { browser, config } = this.test.executor
    
    const activePage = await browser.newPage()
    this.view = new ViewClass(activePage)

    console.log('#to()', config.baseUrl, this.view.url)
    
    await activePage.goto(`${config.baseUrl}${this.view.url}`)
    await this.at()
  }

  async at () {
    console.log('#at()', this.view.url)
    await this.view.at(this)
  }

  async equal (actual, expected) {
    console.log('#equal()', actual, expected)
    expect(actual).to.equal(expected)
  }
}

module.exports = Context