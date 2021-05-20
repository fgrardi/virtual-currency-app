const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const transactionSchema = new Schema({
    text: String,
    amount: Number,
    user: String,
    recipient: String,
    reason: String,
    completed: Boolean
});
const Transaction = mongoose.model('Transation', transactionSchema);

module.exports = Transaction;