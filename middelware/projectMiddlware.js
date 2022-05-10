const statusProject=(req,res,next)=>{
    const Task=require('../models/task')
    const dayjs = require('dayjs')
 var isBetween = require('dayjs/plugin/isBetween')
 dayjs.extend(isBetween)
  
 const {createdAt, status}=req.body
 const statusTask = await Task.find({task: task});

 
 statusTask.map(async (task) => {    
                                 
     const statusTest= (dayjs(createdAt+1).isBetween(dayjs(task.createdAt), null,[] ) )||
     (dayjs(createdAt+2).isBetween(dayjs(task.createdAt),null,[] ) ) 
 
     console.log(statusTest)
 })
 if(status=="undone"){
     res.status(200).send({message: " undone ",status});
 }else{
     next()                                
 }
}
  module.exports=statusProject;