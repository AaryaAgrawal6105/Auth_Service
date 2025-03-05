const express = require('express');
const {PORT} = require('./config/serverConfig')
const bodyParser = require('body-parser')
const apiRoutes = require('./routes/index')
const db = require('./models/index')
const {User , role} = require('./models/index')

const app = express();


const prepareAndStartServer =  ()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended :true}))
    app.listen(PORT  ,async ()=>{
        // db.sequelize.sync({alter : true})
        app.use('/api' , apiRoutes) 
        console.log(`Server is running on port ${PORT}`)

        // const u1 = await User.findByPk(1);
        // const r1 = await role.findByPk(1);
        // u1.addRole(r1);
        
    } )
}

prepareAndStartServer();