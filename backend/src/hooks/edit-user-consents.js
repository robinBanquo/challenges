// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const currentUser = context.params.user;
    const Users=context.app.service('users');
    const newConsents = [...currentUser.consents.filter(consent=> consent.type != context.data.type), {
      type:context.data.type,
      enabled:context.data.enabled 
    }];
    Users.patch(currentUser._id, {consents: newConsents});

    return context;
  };
};
