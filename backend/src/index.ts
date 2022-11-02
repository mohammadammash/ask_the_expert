import express, {Express, Request, Response} from "express";
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");

const app: Express = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/',(req: Request, res: Response)=>{
    res.send('Typescript runs well');
})

app.listen(process.env.SERVER_PORT, ()=>{
    console.log('Running on 3000');
});