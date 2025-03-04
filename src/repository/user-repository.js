const { User } = require('../models/index.js'); 

class UserRepository{
    async create(data){
        try{
            const user= await User.create(data);
            return user;
        }
        catch(error){
            throw {error};
        }
    }
    async destroy(userId){
        try{
            await User.destroy({
                where : {
                    id : userId
                }
            }
        )
        return true;
        }
        catch(error){
            throw { error };
        }
    }
    async getbyId(userId) {
        try{
            const user = await User.findByPk(userId , {
                attributes : ['email' , 'id'],
            })
            return user;
        }
        catch(error){
            throw {error};
        }
    }
    async getByEmail(userEmail){
        try{
            const user = await User.findOne({where : {
                email : userEmail,
        }});
            return user;
        }
        catch(error){
            throw {error};
        }
    }
}

module.exports  = UserRepository