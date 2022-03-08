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

             // Recoger parámetros de la petición
        const params = req.body;

        // Validar los datos
        const validate_name = params.name && !validator.isEmpty(params.name);
        const validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
        const validate_password = params.password && !validator.isEmpty(params.password);

        if (validate_name && validate_email && validate_password) {

            try {

                let result = await userService.add(params);

                if(result){
                res.status(200).send(result);
                }else{
                return res.status(400).send({ status: 'ko', message: "No se ha podido registrar al usuario" }); 
                }
        
                
            } catch (err) {
                res.status(500).send(err);
            }


        } else {
            return res.status(400).send({ status: 'ko', message: "Validación de los datos de usuario incorrecta" });
        }
        
        
        },
        login: async (req, res) => {
            // Recoger parámetros de la petición
            const params = req.body;
    
            // Validar los datos obligatorios
            const validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
            const validate_password = !validator.isEmpty(params.password);
    
            if (!validate_email || !validate_password) {
                return res.status(400).send({ status: 'ko', message: "Error al intentar identificarse" });
            }

            try {

                let result = await userService.login(params.email, params.password)

                if(result){
                res.status(200).send(result);
                }else{
                return res.status(500).send({ status: 'ko', message: "Error al intentar identificarse" }); 
                }
        
                
            } catch (err) {
                res.status(400).send(err);
            }

        }
    }
}


module.exports = userController;