'use strict'

const { expect } = require('code')

class Context {
  constructor (test) {
    this.test = test
  }

  async to (PageClass) {
    const { browser, config } = this.test.executor
    
    const activePage = await browser.newPage()
    const pageInstance = new PageClass(activePage)

    console.log('#to()', config.baseUrl, pageInstance.url)
    
    await activePage.goto(`${config.baseUrl}${pageInstance.url}`)
    await this.at(pageInstance)
  }

  async at (pageInstance) {
    console.log('#at()', pageInstance.url)
    await pageInstance.at(this)
  }

  async equal (actual, expected) {
    console.log('#equal()', actual, expected)
    expect(actual).to.equal(expected)
  }
}

module.exports = Context