const pool = require("./config/database");

async function testarConexao() {
    try {
        const resultado = await pool.query("SELECT NOW()");
        console.log("Conexao com PostgreSQL realizada com sucesso!");
        console.log("Horario do banco:", resultado.rows[0].now);
    } catch (erro) {
        console.error("Erro ao conectar ao banco:", erro.message);
    } finally {
        await pool.end();
    }
}

testarConexao();