const validator = require('validator');


const connectionsController = (connectionsService) => {

    return {

    
        requestConnection: async (req, res) => {

             // Recoger parámetros de la petición
        const params = req.body;

        // Validar los datos
        const validate_requestAccount = params.requestAccount && !validator.isEmpty(params.requestAccount);
        const validate_connectAccount = params.connectAccount && !validator.isEmpty(params.connectAccount);


        if (validate_requestAccount && validate_connectAccount) {

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

        
      approveConnection: async (req, res) => {

            // Recoger parámetros de la petición
       const params = req.body;

       // Validar los datos
       const validate_connId = params.connId && !validator.isEmpty(params.connId);
       const validate_account = params.account && !validator.isEmpty(params.account);


       if (validate_connId && validate_account) {

           try {
               
               let result = await connectionsService.approveConnection(params);

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