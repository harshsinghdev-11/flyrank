import express from "express";

const app = express();
app.use(express.json());
const PORT = 3000;

const tasks:{
    id:number,
    title:string,
    isCompleted:boolean
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

app.post("/tasks",(req,res)=>{
    const {title} = req.body;
    if(!title){
        res.status(400).json({"error":"what's wrong"});
    }
    const newTask = {
        id:tasks.length+1,
        title,
        isCompleted:false
    }
    tasks.push(newTask);
    res.status(201).json(newTask);
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})