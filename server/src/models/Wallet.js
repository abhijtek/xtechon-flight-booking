const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
  userId: { type: String, unique: true, required: true },
  balance: { type: Number, required: true }
});

module.exports = mongoose.model('Wallet', WalletSchema);
