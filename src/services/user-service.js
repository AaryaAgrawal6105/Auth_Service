const UserRepository  = require('../repository/user-repository')
 
class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try{
            const user = await this.userRepository.create(data);
            return user;
        }
        catch(error){
            throw { error }
        }
    }
    async destroy(userId){
        try{
            await this.userRepository.destroy(userId);
            return true;
        }
        catch(error){
            throw { error }
        }

    }
}

module.exports = UserService