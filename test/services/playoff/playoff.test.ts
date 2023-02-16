// For more information about this file see https://dove.feathersjs.com/guides/cli/service.test.html
import assert from 'assert'
import { app } from '../../../src/app'

describe('playoff service', () => {
  it('registered the service', () => {
    const service = app.service('playoff')

    assert.ok(service, 'Registered the service')
  })
})
