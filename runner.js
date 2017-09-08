'use strict'

const { expect } = require('code')
const puppeteer = require('puppeteer')

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
    expect(actual).to.equal(expected)
  }
}

class Test {
  constructor (executor) {
    this.executor = executor
  }

  async given (ctx) {
    console.log('Called given')
    const runner = new Context(this)
    await ctx(runner)
  }

  expect (ctx) {
  }
}

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
      console.log(`❌ ${testName}`)
    }
  }
}

const config = {
  baseUrl: 'http://example.com'
}

exports.suite = function (suiteName, suite) {
  console.log(`Running suite ${suiteName}`)
  const core = async () => {
    const browser = await puppeteer.launch()
    await suite(new Executor(browser, config))
    browser.close()
  }
  core()
}
