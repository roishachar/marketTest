var mongoose = require('mongoose');

var payDBSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  location: String,
  creditcard: Number
});

var PayDB = mongoose.model('PayDB', payDBSchema);

module.exports = PayDB;
