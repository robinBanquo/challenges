// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'users';
  const mongooseClient = app.get('mongooseClient');

  const consent = new mongooseClient.Schema({
    type: {
      type: String,
      enum: ['email_notifications', 'sms_notifications']
    },
    enabled: {
      type: Boolean,
      required: true
    }
  });

  const schema = new mongooseClient.Schema({
    email: {
      type: String,
      unique: true,
      lowercase: true,
      match: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address']
    },
    password: {
      type: String
    },
    consents: {
      type: [consent],
      default: []
    }
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};
