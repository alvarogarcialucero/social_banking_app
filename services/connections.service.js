
'use strict'

class connectionsService {
   
 
    constructor(Models){

        this.init(Models);
  
       }
  
       async init(Models){
       this.models = await Models;
       }
  
  


    async requestConnection (data) {
        
        return await new Promise(async (resolve, reject) => {
            let existsConnection = await this.getConnection(data);
                    if (existsConnection.length == 0) {
                       

                                try{
                                    data.status = 'PENDING';
                                    let connection = await this.models.connectionSchema(data).save();
                                    if(connection){
                                        resolve({ status: 'ok', message: "Conexión Registrada correctamente"})
                                    }else{
                                        reject({ status: 'ko', message: "Ha ocurrido un error al guardar la conexión" });
                                    }
                                }
                                catch(err){
                                    reject({ status: 'ko', message: "Ha ocurrido un error al guardar la conexión" });
                                }
                       


                    } else {
                        reject({ status: 'ko', message: "Ya existe esa conexión" });
                    }
       
        });
    }

    async getConnection(data) {
        return await this.models.connectionSchema.find({"accountA": data.accountA,"accountB": data.accountB});
    }

    async getConnections(account){
        return await new Promise(async (resolve, reject) => {
            let existsConnection = await this.getConnectionsByAccount(account);
            
                    if (existsConnection.length > 0) {                       
                     var connectionsList = [];
                     existsConnection.forEach(async (element,index) => {
                            var connectedAccount = '';
                            if(element.accountA === account){
                                connectedAccount = element.accountB;
                            }else{
                                connectedAccount = element.accountA;
                            } 

                     
                                var userInfo = await this.models.userSchema.find({"account":connectedAccount});
                                connectionsList.push(userInfo[0]);                           
                       
                         if(index === existsConnection.length -1){
                            resolve({ status: 'ok', message: "Conexiones listadas correctamente", result: connectionsList})
                         }
                          
                        });



                    } else {
                        reject({ status: 'ko', message: "No existe conexión para esa cuenta" });
                    }

                  
        });
    }

    async getConnectionsByAccount(account) {
        return await this.models.connectionSchema.find({ $or:[ {'accountA':account}, {'accountB':account} ]});
    }

}


module.exports = connectionsService;