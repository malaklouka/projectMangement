const mongoose=require('mongoose')
const userSchema= new mongoose.Schema({
  
  name:{
      type:String
    },

  surname:{
      type:String
    },

  email:{
        type:String,
        required:true,
        unique:true
    },
  
    role:{
        type: String,
        required: false,
        enum: ["project manager", "user", "admin"],
        default:"admin"
    },
 
      
  });
module.exports=User=mongoose.model("user",userSchema)