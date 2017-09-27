'use strict'

const { expect } = require('code')

class Context {
  constructor (test) {
    this.test = test
  }

  async to (ViewClass) {
    const { browser, config } = this.test.executor
    
    const activePage = await browser.newPage()
    const viewInstance = new ViewClass(activePage)

    console.log('#to()', config.baseUrl, viewInstance.url)
    
    await activePage.goto(`${config.baseUrl}${viewInstance.url}`)
    await this.at(viewInstance)
  }

  async at (viewInstance) {
    console.log('#at()', viewInstance.url)
    await viewInstance.at(this)
  }

  async equal (actual, expected) {
    console.log('#equal()', actual, expected)
    expect(actual).to.equal(expected)
  }
}

module.exports = Context