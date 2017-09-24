'use strict'

const { expect } = require('code')

class View {
  constructor (browserPage) {
    this.browserPage = browserPage
  }

  async title () {
    return this.browserPage.title()
  }
}

module.exports = View
