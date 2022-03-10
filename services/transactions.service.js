
'use strict'

class transactionsService {


    constructor(Models) {

        this.init(Models);

    }

    async init(Models) {
        this.models = await Models;
    }




    async addTransaction(params) {



        return await new Promise(async (resolve, reject) => {



            if (params.Amount < 1000) {
                params.Revenue = 1
            } else {
                params.Revenue = 0.5
            }

            try {

                let transaction = await this.models.transactionSchema(params).save();
                if (transaction) {
                    resolve({ status: 'ok', message: "transacción Registrada correctamente" });
                } else {
                    reject({ status: 'ko', message: "Ha ocurrido un error al registrar la transacción" });
                }
            }
            catch (err) {
                reject({ status: 'ko', message: "Ha ocurrido un error al registrar la transacción" });
            }



        });
    }


}


module.exports = transactionsService;