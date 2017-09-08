'use strict'

const { expect } = require('code')

class Page {
  constructor (browserPage) {
    this.browserPage = browserPage
  }

  async title () {
    return this.browserPage.title()
  }
}

module.exports = Page
