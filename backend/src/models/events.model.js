// events-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'events';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const changeConsent = new Schema({
    type: { type: String,  enum: ['email_notifications', 'sms_notifications'] , required:true},
    enabled: { type: Boolean, required:true }
  });

  const schema = new Schema({
    type:{ type: String,  enum: ['changeConsent'] , required:true},
    changeConsent: {type: changeConsent},
    user_id: {type: String, required:true}
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
