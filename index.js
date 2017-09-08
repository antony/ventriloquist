'use strict'

const { suite } = require('./runner')
const Page = require('./page')

class MyPage extends Page {
  get url () {
    return '/'
  }

  async at (e) {
    e.equal(await this.title(), 'Examplde Domain')
  }

  get content () {
    return {
      header: $ => { return $('h1') },
      text: $ => { return $('p') },
      link: $ => { return $('h1') }
    }
  }
}

suite('examplecom', async s => {

  await s.test('Can visit page', async t => {

    await t.given(async c => {
      await c.to(MyPage)
    })

    t.expect(c => {
      c.equal(c.page.header, 'Example Domain')
    })

  })

})