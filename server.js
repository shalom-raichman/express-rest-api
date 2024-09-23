import express from "express"
import amnControler from "./controllers/amnControler.js"
import chalk from "chalk"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()

app.use(express.json())
app.use("/amn", amnControler)

const PORT = 7499;

app.get("/", (req, res) => {    
    res.sendFile(__dirname + "/views/index.html");
});

app.listen(PORT, () => {
    console.log(chalk.magenta(
        `Server is up and runing on port: ${PORT} visit`) + chalk.blue(` HTTP://localhost:${PORT}`)
    );
});


// express
// routing
// middle were
// static folder