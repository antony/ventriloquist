'use strict'

const Ventriloquist = require('..')
const { suite, View } = Ventriloquist

class MyView extends View {
  get url () {
    return '/'
  }

  async at (e) {
    e.equal(await this.title(), 'Example Domain')
  }

  get content () {
    return {
      header: $ => { return $('h1') },
      text: $ => { return $('p') },
      link: $ => { return $('p > a') }
    }
  }
}

suite('example.com', async s => {

  await s.test('Can visit page', async t => {

    await t.given(async c => {
      await c.to(MyView)
    })

    t.expect(c => {
      c.equal(c.view.content.header, 'Examplee Domain')
    })

  })

})