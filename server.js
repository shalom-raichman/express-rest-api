import express from "express";
import amnControler from "./controllers/amnControler.js"
import chalk from "chalk";

const app = express();

app.use(express.json());
app.use("/amn", amnControler)

const port = 7499;

app.get("/", (req, res) => {
    res.send("Welcome to my Ammunition Center");
});

app.listen(port, () => {
    console.log(chalk.magenta(
        `server is up and runing on port: ${port} visit`) + chalk.blue(` http://localhost:${port}`)
    );
});
