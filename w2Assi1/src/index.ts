import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../openapi.json" with { type: "json" };



const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
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
        return;
    }
    res.status(404).json({ "error": "Task 99 not found" });
})

app.post("/tasks",(req,res)=>{
    const {title} = req.body;
    if(!title){
        res.status(400).json({"error":"what's wrong"});
        return;
    }
    const newTask = {
        id:tasks.length+1,
        title,
        isCompleted:false
    }
    tasks.push(newTask);
    res.status(201).json(newTask);
})

app.put("/tasks/:id",(req,res)=>{
    const taskId = parseInt(req.params.id);
    if(!taskId || isNaN(taskId) || taskId<=0){
        res.status(400).json({"error":"Invalid task ID"});
        return;
    }
    const task = tasks.find(t=>t.id===taskId);
    if(!task){
        res.status(404).json({"error":"Unknown id"});
        return;
    }
    const {title,isCompleted} = req.body;
    if(title===undefined || isCompleted===undefined || (typeof isCompleted!=="boolean") || (typeof title!=="string")){
        res.status(400).json({"error":"Empty/invalid body"});
        return;
    }

    if(title!==undefined){
        task.title = title;
    }

    if(isCompleted!==undefined){
        task.isCompleted = isCompleted;
    }

    res.json(task);
})

app.delete("/tasks/:id",(req,res)=>{
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t=>t.id===taskId);
    if(!taskId || isNaN(taskId) || taskId<=0){
        res.status(400).json({"error":"Invalid task ID"});
        return;
    }
    const task = tasks.find(t=>t.id===taskId);
    if(!task){
        res.status(404).json({"error":"Unknown id"});
        return;
    }
    tasks.splice(taskIndex,1);
    res.status(204).json({"No Content":"success, nothing to say"});
})

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})