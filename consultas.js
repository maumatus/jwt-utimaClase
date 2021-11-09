const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    database: "pgnode",
    port: 5432
})

let loginUsuario = async(email, password) => {
    try {
        let consulta = {
                text: "SELECT * FROM users WHERE email = $1 AND password = $2",
                values: [email, password]
            }
            // let consulta = `SELECT * FROM users WHERE email = ${email}`
        const resultado = await pool.query(consulta)
        return resultado
    } catch (err) {
        return err.message
    }
}

let listadoPosts = async(userId) => {
    try {
        let consulta = {
            text: "SELECT * FROM posts WHERE user_id = $1",
            values: [userId]
        }
        const resultado = await pool.query(consulta)
        return resultado
    } catch (err) {
        return err.message
    }
}

let registrarPosts = async(titulo, cuerpo, userId) => {
    try {
        let consulta = {
            text: "INSERT INTO posts(titulo, cuerpo, user_id) VALUES($1, $2, $3)",
            values: [titulo, cuerpo, userId]
        }
        const resultado = await pool.query(consulta)
        return resultado
    } catch (err) {
        return err.message
    }
}

module.exports = { loginUsuario, listadoPosts, registrarPosts }