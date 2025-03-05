const validateUserAuth = (req,res ,next)=>{
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            success : false ,
            data : {}, 
            message : 'Incorrect data being sent',
            err : "missing the email or password "
        })
    }
    next();
}

const validateIsAdminRequest = (req,res ,next)=>{
    if(!req.body.id){
        return res.status(400).json({
            success  : false,
            error : 'User id not given',
            data:{},
            message  :'something went wrong'
        })
    }
    next();
}

module.exports = {validateUserAuth , validateIsAdminRequest}
