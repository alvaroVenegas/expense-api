const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
const User = require('../models/users.model');

const URL_DB = process.env.MONGODBURL || "mongodb://localhost:27017/expense-api";

const users = [
    {
        "userName": "SuperMati",
        "email": "Matias@gmail.com",
        "password": "Peruenelcorazon14"
    },
    {
        "userName": "HorseMaria",
        "email": "Horse@gmail.com",
        "password": "Caballodemar69"
    }
];

mongoose.connect(URL_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then(async () => {
        const allUsers = await User.find();

        if (allUsers.length) {
            await User.collection.drop();
            console.log("Colección eliminada")

        }
    })
    .catch(error => {
        console.log("Error eliminando la coleccion deseada", error)
    })
    .then(async () => {
        await User.insertMany(users);
        console.log("La semilla se ha plantado correctamente")
    })
    .catch(error => {
        console.log("Error plantando la semilla", error)
    })
    .finally(() => mongoose.disconnect());