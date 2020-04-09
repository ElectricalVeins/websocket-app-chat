const mongoose = require('mongoose');

mongoose.connect('mongodb://mongodb:27017/fc_chat', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once( 'open', () => console.log( 'mongodb successfully connected' ) );
mongoose.connection.on('error', err => console.log(err));

module.exports.User = require('./User.js');
module.exports.Chat = require('./Chat.js');
