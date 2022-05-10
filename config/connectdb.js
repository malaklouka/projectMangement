const mongoose=require('mongoose')
const connectdb= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("successfully connect to database :) ")
    } catch (error) {
        console.log(error)
    }
}
module.exports=connectdb