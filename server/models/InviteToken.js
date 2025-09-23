const mongoose = require('mongoose');

const inviteSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  schoolId: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  used: { type: Boolean, default: false },
  usedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  usedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model('InviteToken', inviteSchema);