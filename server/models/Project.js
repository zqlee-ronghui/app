const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name: {type: String},
    description: {type: String},
    online: {type: Boolean},
    state: {type: Number}
})

module.exports = mongoose.model('Project', schema)