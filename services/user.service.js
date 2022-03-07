
'use strict'


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

    async add(body) {

        const user = this.models.userSchema(body);
        return user
          .save()

    }
    
}


module.exports = userService;