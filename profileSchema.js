const mongoose = require('mongoose')
const profileSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
        unique: true
    },
    serverID: {
        type: String,
        required: true
    },
    fishy: {
        type: Number,
        required: true,
        default: 1000
    },
    bank: {
        type: Number,
        required: true
    },
    blacklisted: {
        type: Boolean,
        required: true
    },
    banned: {
        type: Boolean,
        required: true
    },
    bancount: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('profileSchemaTest', profileSchema);
