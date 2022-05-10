const mongoose=require('mongoose')
const projectSchema= new mongoose.Schema({
  
  title:{
      type:String
    },

    description:{
      type:String
    },

  adminsList:{
    type: Array,
    default: []
    },
    usersList:{
      type: Array,
      default: []
    },
    status:{
        type: String,
        required: false,
        enum: ["done", "undone", "pending"],
        default:"undone"
    },
    tasks: { type: Array,
      default: [] },
  
    createdAt:{
        type: Date,
    default: Date.now,
    },
 
      
  });
module.exports=Project=mongoose.model("project",projectSchema)