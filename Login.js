const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Hash password before saving
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  this.password = bcrypt.hashSync(this.password, 8);
  next();
});

const User = mongoose.model('UserLogin', userSchema);

module.exports = User;
