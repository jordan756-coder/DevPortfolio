const pool = require("../config/database");

async function listarProjetos() {
    const resultado = await pool.query(
        "SELECT * FROM projetos ORDER BY id"
    );

    return resultado.rows;
}

async function criarProjeto(dadosProjeto) {
    const resultado = await pool.query(
        `INSERT INTO projetos
            (nome, descricao, tecnologias)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [
            dadosProjeto.nome.trim(),
            dadosProjeto.descricao.trim(),
            dadosProjeto.tecnologias.map(
                (tecnologia) => tecnologia.trim()
            )
        ]
    );

    return resultado.rows[0];
}

async function atualizarProjeto(id, dadosProjeto) {
    const resultado = await pool.query(
        `UPDATE projetos
         SET nome = $1, descricao = $2, tecnologias = $3
         WHERE id = $4
         RETURNING *`,
        [
            dadosProjeto.nome.trim(),
            dadosProjeto.descricao.trim(),
            dadosProjeto.tecnologias.map(
                (tecnologia) => tecnologia.trim()
            ),
            id
        ]
    );

    return resultado.rows[0] || null;
}

async function excluirProjeto(id) {
    const resultado = await pool.query(
        "DELETE FROM projetos WHERE id = $1 RETURNING *",
        [id]
    );

    return resultado.rows[0] || null;
}

module.exports = {
    listarProjetos,
    criarProjeto,
    atualizarProjeto,
    excluirProjeto
};