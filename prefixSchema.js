const mongoose = require('mongoose')
const prefixSchema = new mongoose.Schema({
    serverID: {
        type: String,
        required: true,
    },
    prefix: {
        type: String,
        required: true,
    }
}, {
    strict: true,
    strictQuery: false,
})

module.exports = mongoose.model('prefixSchemaTest', prefixSchema, 'prefixSchemaTest');