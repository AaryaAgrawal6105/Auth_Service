const  UserService  = require('../services/user-service')

const userService = new UserService();

const create =  async (req , res ) =>{
    try{
        const response = await userService.create(
            {email : req.body.email , 
            password : req.body.password}
        )
        return res.status(201).json({
            data : response , 
            message : "successfully created a user" ,
            success : true, 
            err : {}
        })
    }
    catch(error){
        return res.status(500).json({
            data : {} ,
            message : "Failed to create a user" ,
            success : false ,
            err : {error}

        })
    }
}
 const signIn = async (req, res)=>{
        try{
            const response = await userService.signIn(req.body.email , req.body.password);
            
            return res.status(200).json({
                data : response , 
                message : "successfully sign in the user" ,
                success : true, 
                err : {}
            })
        }
        catch(error){
            return res.status(500).json({
                data : {} ,
                message : "Failed to sign in the user" ,
                success : false ,
                err : {error}
    
            })
        }
 }
// const destroy = async (req , res ) =>{
//     try{
//          await userService.destroy(
            
//         )
//         return res.status(200).json({
//             data : true , 
//             message : "successfully deleted a user" ,
//             success : true, 
//             err : {}
//         })
//     }
//     catch(error){
//         return res.status(500).json({
//             data : false ,
//             message : "Failed to delete a user" ,
//             success : false ,
//             err : {error}

//         })
//     }
// }
 const isAuthenticated = async (req , res) =>{

    try{
        const token = req.header('x-access-token');
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            success : true,
            data:response ,
            err :{},
            message :'token is valid'
        })
    }
    catch(error){
                return res.status(500).json({
                    data : false ,
                    message : "Failed to validate the token of a user" ,
                    success : false ,
                    err : {error}
        
                })
            }

 }

module.exports = {
    create, 
    // destroy
    signIn,
    isAuthenticated
}