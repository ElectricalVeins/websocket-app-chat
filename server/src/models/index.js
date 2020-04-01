const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fc_chat', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once( 'open', () => console.log( 'mongodb successfully connected' ) );

module.exports.User = require('./User.js');
module.exports.Chat = require('./Chat.js');
