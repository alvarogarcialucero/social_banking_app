
'use strict'
const bcrypt = require('bcrypt-nodejs');

class userService {
   
 
    constructor(Models){

        this.init(Models);
  
       }
  
       async init(Models){
       this.models = await Models;
       }
  
  

    async getUsers() {

        return this.models.userSchema
        .find()
      

    }

    async add (data) {
        
        return await new Promise(async (resolve, reject) => {
            let existsUser = await this.getByEmail(data.email);
                    if (existsUser.length == 0) {
                        //cifrar la contraseña
                        bcrypt.hash(data.password, null, null, async (err, hash) => {
                            data.password = hash;
                            if (err) {
                                reject({ status: 'ko', message: "Ha ocurrido un error al guardar el usuario" });
                            } else {

                                try{
                                    let user = await this.models.userSchema(data).save();
                                    if(user){
                                        resolve({ status: 'ok', message: "Registrado correctamente"})
                                    }else{
                                        reject({ status: 'ko', message: "Ha ocurrido un error al guardar el usuario" });
                                    }
                                }
                                catch(err){
                                    reject({ status: 'ko', message: "Ha ocurrido un error al guardar el usuario" });
                                }
                            }
                        });


                    } else {
                        reject({ status: 'ko', message: "Ya existe un usuario con ese email" });
                    }
       
        });
    }

    async getByEmail(email) {
        return await this.models.userSchema.find({"email": email});
    }
}


module.exports = userService;