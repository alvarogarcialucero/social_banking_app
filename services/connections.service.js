
'use strict'

class connectionsService {
   
 
    constructor(Models){

        this.init(Models);
  
       }
  
       async init(Models){
       this.models = await Models;
       }
  
  


    async requestConnection (params) {
        
        return await new Promise(async (resolve, reject) => {
            let existsConnection = await this.getConnection(params);
                    if (existsConnection.length == 0) {
                       

                                try{
                                    let data = params;
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

    async approveConnection (data) {
        
        return await new Promise(async (resolve, reject) => {
            let existsConnection = await this.getConnectionById(data);
                    if (existsConnection.length > 0) {       
                        
                            if(data.account === existsConnection[0].connectAccount){

                                try{
                                    const filter = { _id: data.connId };
                                    const update = { status: 'APPROVED' };

                                    
                                    let connection = await  this.models.connectionSchema.findOneAndUpdate(filter, update, {
                                        returnOriginal: false
                                    });
                                 
                                    if(connection){
                                        resolve({ status: 'ok', message: "Conexión aprobada correctamente"})
                                    }else{
                                        reject({ status: 'ko', message: "Ha ocurrido un error al aprobar la conexión" });
                                    }
                                }
                                catch(err){
                                    reject({ status: 'ko', message: "Ha ocurrido un error al aprobar la conexión" });
                                }
                            }else{
                                reject({ status: 'ko', message: "No tienes permiso para aprobar la conexión" });
                            }


                    } else {
                        reject({ status: 'ko', message: "No existe esa conexión" });
                    }
       
        });
    }


    async getConnection(data) {
        return await this.models.connectionSchema.find({"requestAccount": data.requestAccount,"connectAccount": data.connectAccount});
    }

    async getConnectionById(data) {
        return await this.models.connectionSchema.find({_id :data.connId});
    }

    async getConnections(account){
        return await new Promise(async (resolve, reject) => {
            let existsConnection = await this.getConnectionsByAccount(account);
            
                    if (existsConnection.length > 0) {                       
                     let connectionsList = [];
                     existsConnection.forEach(async (element,index) => {
                            let connectedAccount = '';
                            if(element.requestAccount === account){
                                connectedAccount = element.connectAccount;
                                
                            }else{
                                connectedAccount = element.requestAccount;
                              
                            } 

                     
                                let userInfo = await this.models.userSchema.find({"account":connectedAccount});

                                let objUser = {  
                                        "idConnection":element._id,          
                                        "statusConnection":element.status,                         
                                        "name": userInfo[0].name,
                                        "age": userInfo[0].age,
                                        "email": userInfo[0].email,                                       
                                        "account": userInfo[0].account
                                         }

                                connectionsList.push(objUser);                           
                       
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
        return await this.models.connectionSchema.find({ $or:[ {'requestAccount':account}, {'connectAccount':account} ]});
    }

}


module.exports = connectionsService;