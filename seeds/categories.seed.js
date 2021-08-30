const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
const Category = require('../models/categories.model');

const URL_DB = process.env.MONGODBURL || "mongodb://localhost:27017/expense-api";

const categories = [
    {
        "name": "Hogar",
    },
    {
        "name": "Salud",
    },
    {
        "name": "Compras",
    },
    {
        "name": "Transporte",
    },
    {
        "name": "Suscripciones",
    },
    {
        "name": "Comida",
    },
    {
        "name": "Ocio",
    },
    {
        "name": "Otros",
    }
]

mongoose.connect(URL_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then(async () => {
        const allCategories = await Category.find();
        if (allCategories.length) {
            await Category.collection.drop();
            console.log("Colección eliminada correctamente");
        }
    })
    .catch(error => {
        console.log("error al borrar la coleccion",error)
    })
    .then(async () => {
        await Category.insertMany(categories);
        console.log("Semilla añadida correctamente")
    })
    .catch(error => {
        return next(error)
    })
    .finally(() => mongoose.disconnect());
