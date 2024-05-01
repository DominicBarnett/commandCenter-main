const mongoose = require('mongoose');

const participationSchema = new mongoose.Schema({
  gameId: { type: mongoose.Schema.Types.ObjectId, ref: 'Game', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  teamName: { type: String, required: true },
  score: { type: Number, default: 0 },
  status: { type: String, default: 'active' }
});

module.exports = mongoose.model('Participation', participationSchema);
