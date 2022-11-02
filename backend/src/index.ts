import express, { Express } from "express";
const app: Express = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//ROUTES
const authMiddleware = require("./middlewares/auth");
const checkIfNoviceMiddleware = require("./middlewares/checkIfNovice");

const authRoutes = require("./routes/auth");
app.use("/", authRoutes);

const noviceRoutes = require("./routes/novice");
app.use("/novice", authMiddleware, checkIfNoviceMiddleware, noviceRoutes);

app.listen(process.env.SERVER_PORT, () => {
    console.log('Running on ' + process.env.SERVER_PORT);
});