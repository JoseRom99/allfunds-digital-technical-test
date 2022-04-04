const mongoose = require('mongoose');

var newsSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    content: {
        required: true,
        type: String
    },
    author: {
        required: true,
        type: String
    },
    date: {
        required: true,
        type: Date
    },
    archiveDate: {
        required: false,
        type: Date
    },

});

module.exports = mongoose.model('News',newsSchema);