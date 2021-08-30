const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();
const Tip = require('../models/tips.model');

const URL_DB = process.env.MONGODBURL || "mongodb://localhost:27017/expense-api";
console.log(URL_DB);
/* const URL_DB = "mongodb://localhost:27017/expense-api"; */
const tips = [
    {
        "title": "Establece metas reales",
        "description": "Plantea objetivos reales. Es importante que tengas claro la razón por la cual quieres ahorrar. Eso te ayudará a motivarte y saber que el dinero que estás guardando tendrá un fin que te beneficiará más adelante. "
    },
    {
        "title": " Determina cuánto y cuándo",
        "description": "Establece tiempos y montos que tú sepas que puedes cumplir, para tener un ahorro sostenido y alcanzar eso que quieres lograr. Puedes planificar diaria, semanal o mensualmente una cantidad fija que irá destinada a tus ahorros."
    },
    {
        "title": "Confía en las listas, son tus aliadas",
        "description": "Organizar tus finanzas a través de un listado de tus gastos te ayudará a controlar mejor el flujo de tu dinero. Te recomendamos hacer una lista en la que priorices tus gastos del más al menos importante, para que, de esta manera, puedas distribuir mejor tus ingresos."
    },
    {
        "title": "Ahorra en servicios",
        "description": "Puedes generar un mayor ahorro de tu dinero con acciones sencillas como reducir el consumo fantasma de luz, o usar solamente el agua necesaria cuando te bañas o te lavas los dientes. Estos pequeños cambios de hábito tendrán un impacto positivo en tu bolsillo. "
    },
    {
        "title": "Escoge un día de compra ",
        "description": "Optimiza tu tiempo y tu dinero estableciendo un día de compra en el supermercado. Cuando vayas, procura tener una lista de los productos que realmente necesitas. También puedes organizar tu día de compra de acuerdo a los descuentos que  los supermercados ofrecen cada día."
    },
    {
        "title": "Prepara un menú semanal",
        "description": "Organiza las comidas de tu semana con anticipación. Esto te ayudará a gastar solo lo indispensable en tus compras, ahorrarás dinero ya que no necesitarás salir a comer fuera de casa e, incluso, beneficiará a  tu salud porque puedes llevar comida saludable al trabajo. "
    },
    {
        "title": "Anticipa festividades ",
        "description": "Durante varias épocas del año, las tiendas físicas y online ofrecen muchos descuentos en sus productos y servicios. Planifica con antelación los regalos de festividades como navidad o cumpleaños y cómpralos cuando sepas que estarán a precios más convenientes."
    },
    {
        "title": "Recicla",
        "description": "Reciclar es una muy buena manera de ahorrar dinero y contribuir al cuidado del planeta. Al reutilizar recipientes en tu casa, llevar tus propias bolsas al supermercado o reutilizar el agua para regar las plantas, estás ayudando a tu bolsillo y al medio ambiente."
    },
    {
        "title": "Hazlo tú mismo",
        "description": "Desde decoraciones para un cumpleaños hasta remodelar una habitación... existe un sinnúmero de actividades que puedes hacerlas por tu cuenta y que no requieren un alto grado de técnica. Incluso puedes encontrar tutoriales en internet que de seguro te ayudarán a ahorrar de una manera divertida y diferente."
    },
    {
        "title": "Evita los gastos hormiga",
        "description": "Procura llevar las cuentas de las cosas que compras a diario e identifica qué gastos son los que valen la pena. A veces pensamos que un café o una golosina no afectan a nuestro bolsillo; pero, si tenemos la costumbre de hacer pequeños gastos todos los días, terminaremos perjudicando a nuestros ahorros."
    },
]

mongoose.connect(URL_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(async () => {
        const allTips = await Tip.find();

        if (allTips.length) {
            await Tip.collection.drop();
            console.log("coleccion eliminada")
        }
    })
    .catch(error => (error))
    .then(async () => {
        await Tip.insertMany(tips)
        console.log("semilla plantada")
    })
    .catch(error => (error))
    .finally(() => mongoose.disconnect());
