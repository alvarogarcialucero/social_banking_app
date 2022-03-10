const validator = require('validator');


const connectionsController = (connectionsService) => {

    return {

    
        requestConnection: async (req, res) => {

             // Recoger parámetros de la petición
        const params = req.body;

        // Validar los datos
        const validate_accountA = params.accountA && !validator.isEmpty(params.accountA);
        const validate_accountB = params.accountB && !validator.isEmpty(params.accountB);


        if (validate_accountA && validate_accountB) {

            try {

                let result = await connectionsService.requestConnection(params);

                if(result){
                res.status(200).send(result);
                }else{
                return res.status(400).send({ status: 'ko', message: "No se ha podido registrar la conexión" }); 
                }
        
                
            } catch (err) {
                res.status(500).send(err);
            }


        } else {
            return res.status(400).send({ status: 'ko', message: "Validación de los datos de conexión incorrecta" });
        }
        
        
        },

        getConnections: async (req, res) => {

            try {
                let account = req.params.account;

                let result = await connectionsService.getConnections(account);
                res.status(200).json(result);
        
                
            } catch (err) {
                res.status(500).json({ message: error });
            }
        
        }
    }
}


module.exports = connectionsController;