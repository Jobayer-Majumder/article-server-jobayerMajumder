const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require("../../models/userModel");



module.exports = {
    findUser: async args => {

        try {
            const user = await userModel.find({ _id: args.id });
            return user
        } catch (error) {
            throw new Error('User not found!')
        }
    },

    loginUser: async args => {
        const { email, password } = args.input;

        try {
            const user = await userModel.findOne({ email: email });
            const validPassword = await bcrypt.compare(password, user.password);


            if (user && validPassword) {
                const token = await jwt.sign({
                    id: user._id,
                    name: user.name,
                    email: user.email
                }, process.env.JSON_TOKEN_SECRET, {
                    expiresIn: '1h'
                })
                return { token }
            } else {
                throw new Error('Credential not valid!')
            }
        } catch (error) {
            throw new Error('Something went wrong with finding user!')
        }
    },


    createUser: async (args) => {
        const { name, email, password } = args.input;

        const user = new userModel({
            name,
            email,
            password
        });

        try {
            const checkExisting = await userModel.find({ email: email });
            if (!checkExisting[0]) {
                await user.save();
                const token = await jwt.sign({
                    id: user._id,
                    name: user.name,
                    email: user.email
                }, process.env.JSON_TOKEN_SECRET, {
                    expiresIn: '1h'
                })
                return { token }
            } else {
                throw new Error('Email already exist!')
            }

        } catch (error) {
            throw new Error('something went wrong with creating user')
        }
    }


};