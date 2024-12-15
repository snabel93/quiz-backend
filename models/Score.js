const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true  // removes whitespace
    },
    score: {
        type: Number,
        required: true,
        min: 0,     // score can't be negative
        max: 10     // since there are 10 questions
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Score', scoreSchema);