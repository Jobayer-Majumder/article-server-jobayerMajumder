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
                const users = await user.save();
                return [users]
            } else {
                throw new Error('Email already exist!')
            }

        } catch (error) {
            throw new Error('something went wrong with creating user')
        }
    }


};