const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const session = require("express-session");
const dbUtils = require("./utils/dbUtils");
const usersRoute = require("./routes/users.routes");
const expensesRoute = require("./routes/expenses.routes");
const tipsRoute = require("./routes/tips.routes");
const categoriesRoute = require("./routes/categories.routes");
const MongoStore = require("connect-mongo");
const passport = require("passport");
require("./auth");


const PORT = 3500;

const server = express();

dbUtils.connect();

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

server.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
}));


server.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1 * 24 * 60 * 60 * 1000,
    },
    store: MongoStore.create({ mongoUrl: dbUtils.URL_DB }),
}));

server.use(passport.initialize());
server.use(passport.session());

server.use(express.json())
server.use(express.urlencoded({ extended: true }))




server.use("/users", usersRoute);
server.use("/expenses", expensesRoute);
server.use("/tips", tipsRoute);
server.use("/categories", categoriesRoute);



server.use("*", (req, res, next) => {
    const error = new Error("Error, ruta desconocida")
    error.status = 404;

    return res.status(404).json(error)
});

server.use((error, req, res, next) => {
    console.log(error);
    console.log('mensaje error', error.message)
    return res.status(error.status || 500).json(error.message || "Unexpected error")
    
})

server.disable('x-powered-by');

server.listen(PORT, () => {
    console.log(`Server is running in port http://localhost:${PORT}`);
});