const mongoose = require('mongoose');

const dotenv = require("dotenv");
dotenv.config();

const URL_DB = process.env.MONGODBURL || "mongodb://localhost:27017/expense-api";
/* const URL_DB = "mongodb://localhost:27017/expense-api"; */

const connect = async () => {
    try {
        const db = await mongoose.connect(URL_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        const { name, host } = db.connection;
        console.log(`Conectado correctamente a la db ${name} en ${host}`);

    } catch (error) {
        console.log("Ha ocurrido un error conectando con la base de datos", error);
    }
};

module.exports = {
    URL_DB,
    connect
};

