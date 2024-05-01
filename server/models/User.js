const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    deleted: { type: Boolean, default: false } // Add a 'deleted' field, defaulting to false
});

const User = mongoose.model('User', UserSchema);

module.exports = User;