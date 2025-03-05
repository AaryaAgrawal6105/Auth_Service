const UserRepository = require('../repository/user-repository')
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig')
const bcrypt = require('bcrypt')

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        }
        catch (error) {
            throw { error }
        }
    }
    async destroy(userId) {
        try {
            await this.userRepository.destroy(userId);
            return true;
        }
        catch (error) {
            throw { error }
        }

    }
    async signIn(email, password) {
        try {
            const user = await this.userRepository.getByEmail(email);
            const passwordsMatch = this.checkPassword(password, user.password);
            if (!passwordsMatch) {
                console.log('the passwords do not match');
                throw ({ error: 'passwords do not match' })
            }
            const newJWT = this.createToken({ email: user.email, id: user.id });
            return newJWT;
        }
        catch (error) {
            console.log('unable to signIn');
            throw { error };
        }
    }


    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, { expiresIn: '1h' });
            return result;
        }
        catch (error) {
            console.log("something went wrong in token creation")
            throw { error };
        }
    }
    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        }
        catch (error) {
            console.log("something went wrong in token validation", error)
            throw { error };
        }
    }
    async isAuthenticated(token) {
        try {
            const response =  this.verifyToken(token);
            if (!response) {
                throw { error: 'invalid token' }
            }
             console.log(response)
            const user = await this.userRepository.getbyId(response.id);
            console.log(user);
            if (!user) {
                throw ({ error: 'user does not exist' })
            }
            return user.id;
        }
        catch (error) {
            throw { error };
        }
    }



    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        }
        catch (error) {
            console.log('somthing went wrong in password matching');
            throw { error };
        }
    }
    isAdmin(userId){
        try{
                return this.userRepository.isAdmin(userId);
        }
        catch(error){
            throw {error}
        }
    }

}

module.exports = UserService