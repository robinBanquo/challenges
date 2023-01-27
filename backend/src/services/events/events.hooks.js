const { authenticate } = require('@feathersjs/authentication').hooks;

const setUserId = require('../../hooks/set-user-id');

const handle_user_events = require('../../hooks/handle_user_events');

const errorHandler = require('../../hooks/error-handler');

const blockAction = require('../../hooks/block-action');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [setUserId(), handle_user_events()],
    update: [blockAction()],
    patch: [blockAction()],
    remove: [blockAction()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [errorHandler()],
    update: [],
    patch: [],
    remove: []
  }
};
