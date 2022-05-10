const express=require('express')
const managerRouter=express.Router()
const Project =require('../models/project')
const User = require('../models/user')


//get all Projects
managerRouter.get('/',async(req,res)=>{
try {
 
    const Projects= await Project.find().populate({ path: 'tasks' })
    res.send({Projects,msg:"all the Projects "})
} catch (error) {
    console.dir(error)
    res.status(401).send({msg:"error while getting all Projects"})
}
})
//delete Project 
managerRouter.delete('/:id',async(req,res)=>{
  const { id } = req.params
    try {
        const result = await Project.findByIdAndRemove(id)
        result.deletedCount ? 
        res.send({  msg:'successfully deleted'}) :  res.send({  msg:'Project  is already deleted :) '})
    } catch (error) {
        res.status(400).send('sorry ,Project is not  deleted :(')
    }
})


//get Project by id
managerRouter.get('/:id',async(req,res)=>{
  try {
    const { id } = req.params
    const oneProject= await Project.findById(id)
      res.send({oneProject,msg:"Project successfully "})
  } catch (error) {
      console.log(error)
      res.status(401).send({msg:"error while getting one Project"})
  }
  })
//add new Project
managerRouter.post('/projects', async(req,res)=>{
  const user = req.user;
const project=req.body

 const {title,description,adminsList,usersList,
    status, createdAt, tasks}=req.body
 
  const newProject = new Project({ title,description,adminsList,usersList,status, createdAt , tasks})

  try {
        
        await newProject.save()
        res.status(201).send({ message: 'New Project Created', project: newProject })
      
    } catch (error) {
      console.log(error)
        res.status(401).send({msg:"cant post Project"})

    }
})


  //update Project
  managerRouter.put("/:id",async(req,res)=>{

    try {
      const updatedProject = await Project.updateOne(
        { _id: req.params.id },
        { $set: { ...req.body } }
      );
      console.log(updatedProject);
      if (updatedProject.modifiedCount) {
        return res.status(201).send({ msg: "Project updated with success :) ",updatedProject });
      }
      res.status(400).send({ msg: "oops! theres no modification.." });
    } catch (error) {
      res.status(400).send({ msg: "sorry we cannot modify this Project " });
    }  
  })

//add list admins
managerRouter.post('/admin', async(req,res)=>{
const admins=req.body

 const {name,surname, email, role }=req.body
 
  const newAdmin = new User({ name, surname, email, role })

  try {
        
        await newAdmin.save()
        res.status(201).send({ message: 'New admin Created', admins: newAdmin })
      
    } catch (error) {
      console.log(error)
        res.status(401).send({msg:"cant post admin"})

    }
})


 
module.exports=managerRouter