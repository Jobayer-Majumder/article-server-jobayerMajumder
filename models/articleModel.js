const mongoose = require('mongoose');



const ArticleModel = new mongoose.Schema({
    id: {
        type: new mongoose.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    authorEmail: {
        type: String,
        required: true
    }    
}, {timestamps: true});



module.exports = mongoose.model('Article', ArticleModel);