const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    question: { type: String, required: true },
    answer: { type: String, required: true },
    options: { type: Object(), required: true }
});

module.exports = mongoose.model('Question', QuestionSchema);
