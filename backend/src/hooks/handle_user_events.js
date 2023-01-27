// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const currentUser = context.params.user;
    const Users=context.app.service('users');
    let  changeConsent;
    let newConsents;
    switch (context.data.type) {
      case 'changeConsent':
        changeConsent= context.data.changeConsent;
        newConsents = [
          ...currentUser.consents.filter(consent=> consent.type != changeConsent.type), 
          {
            type:changeConsent.type,
            enabled:changeConsent.enabled 
          }
        ];
        Users.patch(currentUser._id, {consents: newConsents});
        break;
      
      default:
        break;
    }


    return context;
  };
};
