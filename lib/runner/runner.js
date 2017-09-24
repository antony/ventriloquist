'use strict'

const puppeteer = require('puppeteer')
const config = require('../../config')
const Executor = require('../executor')

module.exports = function (suiteName, suite) {
  console.log(`Running suite ${suiteName}`)
  const core = async () => {
    const browser = await puppeteer.launch(config.browser)
    await suite(new Executor(browser, config.ventriloquist))
    browser.close()
  }
  core()
}