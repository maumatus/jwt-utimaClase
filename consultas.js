const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    password: "Link64cl",
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

module.exports = { loginUsuario }