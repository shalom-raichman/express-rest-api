import exp from "express"
import fs from "fs/promises"
import { v4 } from "uuid"

 const router = exp.Router()

router.get("/", async (req, res) => {
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

router.get("/summary", async (req, res) => {
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

router.get("/:id", async (req, res) => {
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

router.post("/", async (req, res) => {
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
        res.send(newAmn);
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error,
        });
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const data = JSON.parse(await fs.readFile("./data.json", "utf-8"));
        const {type, status, active} = req.body
        const amn = data.findIndex(a => a.id == req.params.id);
        const newAmn = {
            ...data[amn],
            ...req.body
        }
        data[amn] = newAmn
        await fs.writeFile("./data.json", JSON.stringify(data), {
            encoding: "utf-8",
        });
        res.send(newAmn);
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error,
        });
    }
});

export default router