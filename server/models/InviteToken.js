const mongoose = require('mongoose');

const inviteSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  schoolId: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  used: { type: Boolean, default: false }
});


module.exports = mongoose.model('InviteToken', inviteSchema);