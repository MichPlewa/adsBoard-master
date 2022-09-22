const mongoose = require('mongoose');

const adsSchema = new mongoose.Schema({
  title: { type: String, require: true, minlength: 10, maxlength: 50 },
  description: { type: String, require: true, minlength: 20, maxlength: 1000 },
  date: { type: Date, require: true },
  image: { type: String, require: true },
  price: { type: Number, require: true },
  location: { type: String, require: true },
  userName: { type: String, require: true },
});

adsSchema.index({ title: 'text' });
module.exports = mongoose.model('Ad', adsSchema);
