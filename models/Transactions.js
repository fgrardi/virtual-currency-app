const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const transactionSchema = new Schema({
    remark: String,
    amount: Number,
    username: String,
    recipient: String,
    reason: String
});
const Transaction = mongoose.model('Transation', transactionSchema);

module.exports = Transaction;