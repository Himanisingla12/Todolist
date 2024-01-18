const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const app=express();
app.use(cors);
app.use(express.json());
let task=[];
app.post('/',(req,res)=>{
    const newtask=req.body();
    task=[...task,newtask];
    console.log(task);
    res.json({ message: 'Task added successfully', task});
})
app.listen(3000,()=>{
    console.log("server is listening");
})