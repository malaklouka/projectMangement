const express = require('express')
const app = express()
const port = 5000
const managerRouter = require('./routes/manger')
const taskRouter = require('./routes/user')


const connectdb=require('./config/connectdb')
require("dotenv").config()

app.use(express.json())

//connect to database
connectdb()
//routes
app.use("/user", taskRouter)
//every route in bagRouter should start by /aa
app.use('/aa',managerRouter)



//listen to port 
app.listen(port, (erreur) => 
erreur? console.log(erreur): console.log(`server is running at port ${port}`))