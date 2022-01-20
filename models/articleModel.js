const mongoose = require('mongoose');



const ArticleModel = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    comments: {
        type: Array,
        required: true
    },
    authorEmail: {
        type: String,
        required: true
    }  

}, {timestamps: true});



module.exports = mongoose.model('Article', ArticleModel);