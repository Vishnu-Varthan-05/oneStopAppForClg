const User = require("../models/user")

const userService = {
    createUser: async (userData)=>{
        try {
            const user = await User.create(userData);
            return user.id;            
        } catch (error) {
            throw error;
        }
    },
    findUserById: async (userId)=>{
        try {
            const user = await User.findByPk(userId);
            return user;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = userService;