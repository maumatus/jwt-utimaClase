const express = require('express');
const app = express();
const handlebars = require('express-handlebars');

//Configurar
app.listen(3000,()=>console.log("Ejecutando por puerto http://localhost:3000"));

//Config handlebars
app.set("view engine","handlebars");

app.engine(
    "handlebars",
    handlebars({
        layoutsDir: __dirname + "/views",
        partialsDir: __dirname + "/views/partials"
    })
);

//Middleware apra Jquery y Bootstrap
app.use("/bootstrap", express.static(__dirname + '/node_modules/bootstrap/dist/'))
app.use("/jquery", express.static(__dirname + '/node_modules/jquery/dist/'))
app.use("/public", express.static(__dirname + '/public/'))

//Publicar ruta base
app.use("/",(req,res)=>{
    res.render("Inicio",{
        layout: "Inicio"
    })
});

