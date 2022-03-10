const validator = require('validator');


const transactionsController = (transactionsService,connectionsService, usersService) => {

    return {

        addTransaction: async (req, res) => {

             // Recoger parámetros de la petición
        const params = req.body;

        // Validar los datos
        const validate_Sender = params.Sender && !validator.isEmpty(params.Sender);
        const validate_Receiver = params.Receiver && !validator.isEmpty(params.Receiver);
        const validate_Amount = params.Amount && !validator.isEmpty(params.Amount.toString()) && validator.isNumeric(params.Amount.toString());

        if (validate_Sender && validate_Receiver && validate_Amount) {

            try {

                let dataCheckConnection = {
                    requestAccount:params.Sender,
                    connectAccount:params.Receiver
                }

                let CheckConnection = await connectionsService.getConnection(dataCheckConnection);

                if(CheckConnection && CheckConnection.length > 0 && CheckConnection[0].status === 'APPROVED'){


                    

                        //Ver si el Sender tiene fondos suficientes

                        let userInfo = await usersService.getByAccount(params.Sender);


                        if(userInfo[0].balance > params.Amount){


                        let transaction = await transactionsService.addTransaction(params);

                        if(transaction){


                            //Actualizar el balance del usuario Sender

                            let updateBalanceUser = await usersService.updateUserBalance(userInfo[0],params.Amount);

                            if(updateBalanceUser){
                                return res.status(200).send(transaction); 
                            }else{
                                return res.status(400).send({ status: 'ko', message: "Ha ocurrido un problema" }); 

                            }
                        

                        }



                        }else{

                            return res.status(400).send({ status: 'ko', message: "No tienes fondos suficientes" }); 

                        }

                        //res.status(200).send(result);


           
                    



                }else{

                return res.status(400).send({ status: 'ko', message: "No estás conectado con la cuenta de destino o aún no está aprobada la conexión" }); 
                
                }
        
                
            } catch (err) {
                res.status(500).send(err);
            }


        } else {
            return res.status(400).send({ status: 'ko', message: "Validación de los datos de transacción incorrecta" });
        }
        
        
        }
    }
}


module.exports = transactionsController;