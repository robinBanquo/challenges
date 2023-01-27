const assert = require('assert');
const app = require('../../src/app');

describe('\'events\' service', () => {
  let user;
  before(async() =>{
    user = await app.service('users').create({
      email: 'test'+(Math.random() + 1).toString(36).substring(7)+'@example.com',
      password: 'secret'
    });
  });
  it('registered the service', () => {
    const service = app.service('events');

    assert.ok(service, 'Registered the service');
  });
  it('creates event and is shown in user object', async () => {
    
    const event = await app.service('events').create({
      type:'changeConsent',
      changeConsent: {
        type: 'sms_notifications', 
        enabled: true }
    }, {
      user: user
    });
    //refresh user
    user = await app.service('users').get(user._id);
    await app.service('events').create({
      type:'changeConsent',
      changeConsent: {
        type: 'email_notifications', 
        enabled: true }
    }, {user: user});
    // refresh of the user

 
   
    //make sure the user_id has been added
    assert.ok(event.user_id === user._id.toString());
    user = await app.service('users').get(user._id);
    assert.ok(user.consents.length === 2);
    assert.ok(user.consents[0].type  === 'sms_notifications');
    assert.ok(user.consents[0].enabled  === true);
  });
  it('throw 422 error if invalid data', async () => {
    try {
      await app.service('events').create({
        type:'changeConsent',
        changeConsent: {
          type: 'not_recognized', 
          enabled: true }
      }, {user: user});
    } catch (error) {
      assert.equal(error.code, 422);
    }
  });

  it('is not updatable', async () => {
    const event = await app.service('events').create({
      type:'changeConsent',
      changeConsent: {
        type: 'sms_notifications', 
        enabled: true }
    }, {user: user});
    try {
      await app.service('events').patch(event._id,{
        type:'changeConsent',
        changeConsent: {
          type: 'sms_notifications', 
          enabled: false }
      }, {user: user});
    } catch (error) {
      assert.equal(error.code, 405);
    }
  });
});
