const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({

    url: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true },
    shortUrl: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    userId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },

});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
