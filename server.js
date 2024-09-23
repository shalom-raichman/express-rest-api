import express from "express";
import fs from "fs/promises";
import { v4 } from "uuid";

const app = express();

app.use(express.json());

const port = 7499;

app.get("/", (req, res) => {
    res.send("Welcome to my Ammunition Center");
});

app.get("/amn", async (req, res) => {
    try {
        // get the data from file
        const data = await fs.readFile("./data.json", "utf-8");
        // sent it to th client
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error,
        });
    }
});

app.get("/amn/summary", async (req, res) => {
    try {
        // get data from file
        const data = JSON.parse(await fs.readFile("./data.json", "utf-8"));
        // summarize the amn
        const result = data.reduce(
            (obj, curr) => {
                curr.active && obj.active++;
                curr.status && obj.in_stock++;
                return obj;
            },
            {
                active: 0,
                in_stock: 0,
            }
        );
        result.sum = data.length;
        console.log(result);

        // send it back to the client
        res.json(result);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            error: true,
            message: error,
        });
    }
});

app.get("/amn/:id", async (req, res) => {
    try {
        // get data from file
        const data = JSON.parse(await fs.readFile("./data.json", "utf-8"));
        // find the one with the right id
        const amn = data.find((a) => a.id == req.params.id);
        // send it back to the client
        res.json(amn);
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error,
        });
    }
});

app.post("/amn", async (req, res) => {
    try {
        const data = JSON.parse(await fs.readFile("./data.json", "utf-8"));
        // const {type, status, active} = req.body
        const newAmn = {
            ...req.body,
            id: v4(),
        };
        data.push(newAmn);
        await fs.writeFile("./data.json", JSON.stringify(data), {
            encoding: "utf-8",
        });
        res.send(newAmn.id);
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error,
        });
    }
});

app.patch("/amn/:id", (req, res) => {
    res.send("Function not implemented yet");
});

app.listen(port, () => {
    console.log(
        `server is up and runing on port: ${port} visit http://localhost:${port}`
    );
});
