const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, required: true },
  gameMode: { type: String, required: true },
  duration: { type: Number, required: true },
  startTime: { type: Date, required: true },
  autoEnd: { type: Boolean, default: false },
  status: { type: String, default: 'pending' },
  gameEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  deleted: { type: Boolean, default: false } // Add a 'deleted' field, defaulting to false
});

module.exports = mongoose.model('Game', gameSchema);
