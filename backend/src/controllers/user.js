const userService = require("../services/user")

const userController = {
    createUser : async (req, res)=>{
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    },
    getUserById: async (req, res)=>{
        try {
            const user = await userService.findUserById(req.params.id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });   
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({error:error.message})
        }
    }
}

module.exports = userController;