const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UserModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

}, {timestamps: true})


UserModel.pre('save', async function(next){
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword;
    } catch (error) {
        next(error)
    }
});


module.exports = mongoose.model('Users', UserModel);