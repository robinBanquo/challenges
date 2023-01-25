const assert = require('assert');
const app = require('../../src/app');

describe('\'users\' service', () => {
  it('registered the service', () => {
    const service = app.service('users');

    assert.ok(service, 'Registered the service');
  });
  
  it('creates a user, encrypts password', async () => {
    const user = await app.service('users').create({
      email: 'test'+(Math.random() + 1).toString(36).substring(7)+'@example.com',
      password: 'secret'
    });

    // Makes sure the password got encrypted
    assert.ok(user.password !== 'secret');
  });
  it('throw 422 error if invalid email', async () => {
    try {
      await app.service('users').create({
        email: 'test'+(Math.random() + 1).toString(36).substring(7)+'examplecom',
        password: 'secret'
      });
    } catch (error) {
      // Makes sure the password got encrypted
      assert.equal(error.code, 422);
    }
  });

});
