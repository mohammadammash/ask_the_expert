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
const checkIfExpertMiddleware = require("./middlewares/checkIfExpert");
const checkIfAdminMiddleware = require("./middlewares/checkIfAdmin");

const authRoutes = require("./routes/auth");
app.use("/", authRoutes);

const userRoutes = require('./routes/user'); //common
app.use("/user", authMiddleware, userRoutes)

const noviceRoutes = require("./routes/novice");
app.use("/novice", authMiddleware, checkIfNoviceMiddleware, noviceRoutes);

const expertRoutes = require("./routes/expert");
app.use("/expert", authMiddleware, checkIfExpertMiddleware, expertRoutes);

const adminRoutes = require("./routes/admin");
app.use("/admin", authMiddleware, checkIfAdminMiddleware, adminRoutes);

app.listen(process.env.SERVER_PORT, () => {
    console.log('Running on ' + process.env.SERVER_PORT);
});