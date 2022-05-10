const mongoose=require('mongoose')
const taskSchema= new mongoose.Schema({
  projectId : {
    type: mongoose.Schema.Types.ObjectId,
     required: false},

  title:{
      type:String
    },

  description:{
      type:String
    },

  creator:{
    type: String,
    required: false,

    },
    assignedTo:{
        type:String,
        required:false
    },
    status:{
        type: String,
        required: false,
        enum: ["New", "Active", "Done"],
        default:"Done"
    },
    createdAt:{
        type: Date,
    default: Date.now,
    },
    completionDate : {
        type: String,
    }
 
      
  });
module.exports=Task=mongoose.model("task",taskSchema)