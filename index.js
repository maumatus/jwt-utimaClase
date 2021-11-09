const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const { loginUsuario, listadoPosts, registrarPosts } = require('./consultas')
const jwt = require('jsonwebtoken')

//Configurar
app.listen(3000, () => console.log("Ejecutando por puerto http://localhost:3000"));

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Config handlebars
app.set("view engine", "handlebars");

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

const keySecret = '0007FullStackJs' // Generamos la clave secreta para el token

// Ruta para autenticar
app.post("/login", async(req, res) => {
    let { email, password } = req.body
    const resultado = await loginUsuario(email, password)
    if (resultado.rowCount > 0) { // Si el usuario se encuentra logueado

        const token = jwt.sign({
                //exp: Math.floor(Date.now() / 1000) + 60,
                data: resultado.rows[0]
            }, keySecret)
            // console.log(resultado.rows[0].id)
            // res.send(`<a href="/portada?token=${token}&id=${resultado.rows[0].id}">Continuar como usuario</a>`)
            // res.redirect(`/portada?token=${token}&id=${resultado.rows[0].id}`)
        res.send({
            token: token
        })
    } else {
        res.send({
            error: "Acceso denegado"
        })
    }
})

//Publicar ruta base
app.get("/", (req, res) => {
    res.render("Inicio", {
        layout: "Inicio"
    })
});

app.get("/portada", (req, res) => {
    const token = req.query.token
    const id = req.query.token
    res.render("Listado", {
        layout: "Listado",
    })
})

app.post("/listado", (req, res) => {
    let token = req.headers.authorization;

    jwt.verify(token, keySecret, async(err, content) => {
        let respuesta = await listadoPosts(content.data.id)
        res.send({ posts: respuesta.rows })
    })
})

app.post("/registrar_posts", (req, res) => {
    let token = req.headers.authorization;
    let {titulo, cuerpo} = req.body

    jwt.verify(token, keySecret, async(err, content) => {
        
        if(err) return res.send({error: "token inválido"});

        let respuesta = await registrarPosts(titulo, cuerpo, content.data.id)
        res.send({ posts: respuesta.rows })
    })
})