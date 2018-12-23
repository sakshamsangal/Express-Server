const mongoose = require('mongoose')
const x = mongoose.Schema

const schema = new x({
    email: String,
    password: String
})

module.exports = mongoose.model('scehmaName', schema ,'collection1')