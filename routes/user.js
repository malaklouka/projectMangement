const express=require('express')
const taskRouter=express.Router()
const Task =require('../models/task')
const {  
  updateStatusToPending,
  updateStatusToDone, deleteUser} = require("../controllers");


//new user
taskRouter.post('/createuser', async(req,res)=>{

 const {name,surname,email,role}=req.body
 
  const newUser = new User({name,surname,email,role })

  try {
        
        await newUser.save()
        res.status(201).send({ message: 'New user Created', user: newUser })
      
    } catch (error) {
      console.log(error)
        res.status(401).send({msg:"cant post user"})

    }
})

// get all admins
taskRouter.get('/list/admin',async(req,res)=>{
  try {
   
      const admins= await User.find({role: "admin"})
      res.send({admins,msg:"all the admins "})
  } catch (error) {
      console.dir(error)
      res.status(401).send({msg:"error while getting all admins"})
  }
  })

  // get all users
taskRouter.get('/list/user',async(req,res)=>{
  try {
   
      const users= await User.find({role: "user"})
      res.send({users,msg:"all the users "})
  } catch (error) {
      console.dir(error)
      res.status(401).send({msg:"error while getting all users"})
  }
  })

//get all Tasks
taskRouter.get('/',async(req,res)=>{
try {
 
    const Tasks= await Task.find().populate({path:"creator",select: 'name'})
    res.send({Tasks,msg:"all the Tasks "})
} catch (error) {
    console.log(error)
    res.status(401).send({msg:"error while getting all Tasks"})
}
})
//delete Task 
taskRouter.delete('/:id',async(req,res)=>{
  const { id } = req.params
    try {
        const result = await Task.findByIdAndRemove(id)
        result.deletedCount ? 
        res.send({  msg:'successfully deleted'}) :  res.send({  msg:'Task  is already deleted :) '})
    } catch (error) {
        res.status(400).send('sorry ,Task is not  deleted :(')
    }
})


//get Task by id
taskRouter.get('/:id',async(req,res)=>{
  try {
    const { id } = req.params
    const oneTask= await Task.findById(id)
      res.send({oneTask,msg:"Task successfully "})
  } catch (error) {
      console.log(error)
      res.status(401).send({msg:"error while getting one Task"})
  }
  })
//add new Task
taskRouter.post('/tasks', async(req,res)=>{
  const user = req.user;
const task=req.body

 const {title,description,creator,assignedTo,
    status, createdAt, completionDate}=req.body
 
  const newTask = new Task({ title,description,creator,assignedTo,
    status, createdAt, completionDate
  })

  try {
        
        await newTask.save()
        res.status(201).send({ message: 'New Task Created', task: newTask })
      
    } catch (error) {
      console.log(error)
        res.status(401).send({msg:"cant post Task"})

    }
})


  //update Task
  taskRouter.put("/:id",async(req,res)=>{

    try {
      const updatedTask = await Task.updateOne(
        { _id: req.params.id },
        { $set: { ...req.body } }
      );
      console.log(updatedTask);
      if (updatedTask.modifiedCount) {
        return res.send({ msg: "Task updated with success :) ",updatedTask });
      }
      res.status(400).send({ msg: "oops! theres no modification.." });
    } catch (error) {
      res.status(400).send({ msg: "sorry we cannot modify this Task " });
    }  
  })

  taskRouter.put(
    "/updateStatusToPending/:id_task",
    updateStatusToPending
  );
  taskRouter.put(
    "/updateStatusToDone/:id_task",
 
    updateStatusToDone
  );

  taskRouter.delete("/deleteUser/:id",  deleteUser);

  

module.exports=taskRouter