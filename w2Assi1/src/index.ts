import express from "express";

const app = express();
const PORT = 3000;

const tasks:{
    id:number,
    title:string,
    description:string
}[] = [];

app.get("/",(req,res)=>{
    res.json({
        "name": "Task API",
        "version": "1.0", 
        "endpoints": ["/tasks"]
    })
})

app.get("/health",(req,res)=>{
    res.json({ "status": "ok" });
})

app.get("/tasks",(req,res)=>{
    res.json(tasks)
})

app.get("/tasks/:id",(req,res)=>{
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t=>t.id===taskId);
    if(task){
        res.json(task);
    }
    res.status(404).json({ "error": "Task 99 not found" });
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})