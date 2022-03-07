const validator = require('validator');


const userController = (userService) => {

    return {

        getUsers: async (req, res) => {

            try {

                let result = await userService.getUsers()
                res.status(200).json(result);
        
                
            } catch (err) {
                res.status(500).json({ message: error });
            }
        
        },

        add: async (req, res) => {

            try {

                let result = await userService.add(req.body);
                res.status(200).json(result);
        
                
            } catch (err) {
                res.status(500).json({ message: error });
            }
        
        }
    }
}


module.exports = userController;