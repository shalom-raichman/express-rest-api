import express from "express";
import fs from "fs/promises"


const app = express()

const port = 7499

app.get("/", (req, res)=>{
    res.send("Welcome to my Ammunition Center")
})

app.get("/amn", async (req, res)=>{
    try {
        // get the data from file
        const data = await fs.readFile("./data.json", "utf-8")
        // sent it to th client
        res.json(JSON.parse(data))
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error
        })
    }
})

app.get("/amn/:id", async (req, res)=>{
    try {
        // get data from file
        const data = JSON.parse(await fs.readFile("./data.json", "utf-8"))
        // find the one with the right id
        const amn = data.find(a => a.id == req.params.id)
        // send it back to the client
        res.json(amn)
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error
        })
    }
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
