import express from "express";

const app = express()

const port = 7499

app.get("/", (req, res)=>{
    res.send("Welcome to my Ammunition Center")
})

app.get("/amn", (req, res)=>{
    res.send("Function not implemented yet")
})

app.get("/amn/:id", (req, res)=>{
    res.send("Function not implemented yet")
})

app.get("/amn/summary", (req, res)=>{
    res.send("Function not implemented yet")
})

app.post("/amn", (req, res)=>{
    res.send("Function not implemented yet")
})

app.patch("/amn/:id", (req, res)=>{
    res.send("Function not implemented yet")
})

app.listen(port, ()=>{
    console.log(`server is up and runing on port: ${port} visit http://localhost:${port}`);
    
})
