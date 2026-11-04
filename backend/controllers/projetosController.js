const pool = require("../config/database");
const projetosService = require("../services/projetosService");

function responderErro(res, status, mensagem) {
    res.statusCode = status;
    res.setHeader("Content-Type", "application/json");

    res.end(JSON.stringify({
        erro: mensagem
    }));
}

function lerCorpoRequisicao(req) {
    return new Promise((resolve, reject) => {
        let corpo = "";
        const limite = 1024 * 1024;
        let tamanho = 0;
        let finalizado = false;

        function falhar(erro) {
            if (finalizado) return;

            finalizado = true;
            reject(erro);
        }

        req.on("data", (parte) => {
            if (finalizado) return;

            tamanho += parte.length;

            if (tamanho > limite) {
                console.log("Limite de 1 MB ultrapassado.");

                falhar(new Error("CORPO_MUITO_GRANDE"));


                req.removeAllListeners("data");
                req.resume();
                return;
            }

            corpo += parte.toString("utf8");
        });

        req.on("end", () => {
            if (finalizado) return;

            finalizado = true;
            resolve(corpo);
        });

        req.on("error", (erro) => {
            falhar(erro);
        });

        req.on("close", () => {
            if (!req.complete) {
                falhar(new Error("REQUISICAO_INCOMPLETA"));
            }
        });
    });
}


async function listarProjetos(req, res) {
    res.setHeader("Content-Type", "application/json");

    try {
        const projetos = await projetosService.listarProjetos();

        res.statusCode = 200;
        res.end(JSON.stringify(projetos));
    } catch (erro) {
        console.error("Erro ao listar projetos:", erro);

        responderErro(
            res,
            500,
            "Erro interno ao buscar projetos."
        );
    }
}


async function criarProjeto(req, res) {
    res.setHeader("Content-Type", "application/json");

    try {

        const corpo = await lerCorpoRequisicao(req);


        const novoProjeto = JSON.parse(corpo);


        if (
            novoProjeto === null ||
            typeof novoProjeto !== "object" ||
            Array.isArray(novoProjeto)
        ) {
            responderErro(
                res,
                400,
                "Envie um objeto JSON válido."
            );
            return;
        }


        if (
            typeof novoProjeto.nome !== "string" ||
            novoProjeto.nome.trim() === ""
        ) {
            responderErro(
                res,
                400,
                "O nome do projeto é obrigatório."
            );
            return;
        }


        if (
            typeof novoProjeto.descricao !== "string" ||
            novoProjeto.descricao.trim() === ""
        ) {
            responderErro(
                res,
                400,
                "A descrição do projeto é obrigatória."
            );
            return;
        }


        if (
            !Array.isArray(novoProjeto.tecnologias) ||
            novoProjeto.tecnologias.length === 0 ||
            !novoProjeto.tecnologias.every(
                (tecnologia) =>
                    typeof tecnologia === "string" &&
                    tecnologia.trim() !== ""
            )
        ) {
            responderErro(
                res,
                400,
                "Envie pelo menos uma tecnologia válida."
            );
            return;
        }


        const projetoCriado = await projetosService.criarProjeto(
            novoProjeto
        );


        res.statusCode = 201;
        res.end(JSON.stringify(projetoCriado));


    } catch (erro) {
        if (erro.message === "CORPO_MUITO_GRANDE") {
            responderErro(
                res,
                413,
                "O corpo da requisição ultrapassa o limite de 1 MB."
            );
            return;
        }

        if (erro.message === "REQUISICAO_INCOMPLETA") {
            responderErro(
                res,
                400,
                "A requisição foi interrompida antes de terminar."
            );
            return;
        }

        if (erro instanceof SyntaxError) {
            responderErro(
                res,
                400,
                "O JSON enviado é inválido."
            );
            return;
        }

        console.error("Erro ao criar projeto:", erro);

        responderErro(
            res,
            500,
            "Erro interno ao cadastrar o projeto."
        );
    }
}


async function atualizarProjeto(req, res) {
    res.setHeader("Content-Type", "application/json");

    try {

        const id = Number(req.url.split("/").pop());

        if (!Number.isInteger(id) || id <= 0) {
            responderErro(
                res,
                400,
                "O ID do projeto deve ser um número inteiro positivo."
            );
            return;
        }


        const corpo = await lerCorpoRequisicao(req);

        // 3. Converter o JSON
        const dadosAtualizados = JSON.parse(corpo);


        if (
            dadosAtualizados === null ||
            typeof dadosAtualizados !== "object" ||
            Array.isArray(dadosAtualizados)
        ) {
            responderErro(
                res,
                400,
                "Envie um objeto JSON válido."
            );
            return;
        }


        if (
            typeof dadosAtualizados.nome !== "string" ||
            dadosAtualizados.nome.trim() === ""
        ) {
            responderErro(
                res,
                400,
                "O nome do projeto é obrigatório."
            );
            return;
        }


        if (
            typeof dadosAtualizados.descricao !== "string" ||
            dadosAtualizados.descricao.trim() === ""
        ) {
            responderErro(
                res,
                400,
                "A descrição do projeto é obrigatória."
            );
            return;
        }


        if (
            !Array.isArray(dadosAtualizados.tecnologias) ||
            dadosAtualizados.tecnologias.length === 0 ||
            !dadosAtualizados.tecnologias.every(
                (tecnologia) =>
                    typeof tecnologia === "string" &&
                    tecnologia.trim() !== ""
            )
        ) {
            responderErro(
                res,
                400,
                "Envie pelo menos uma tecnologia válida."
            );
            return;
        }


        const projetoAtualizado = await projetosService.atualizarProjeto(
            id,
            dadosAtualizados
        );


        if (projetoAtualizado === null) {
            responderErro(res, 404, "Projeto não encontrado.");
            return;
        }

        res.statusCode = 200;
        res.end(JSON.stringify(projetoAtualizado));


    } catch (erro) {
        if (erro.message === "CORPO_MUITO_GRANDE") {
            responderErro(
                res,
                413,
                "O corpo da requisição ultrapassa o limite de 1 MB."
            );
            return;
        }


        if (erro.message === "REQUISICAO_INCOMPLETA") {
            responderErro(
                res,
                400,
                "A requisição foi interrompida antes de terminar."
            );
            return;
        }


        if (erro instanceof SyntaxError) {
            responderErro(
                res,
                400,
                "O JSON enviado é inválido."
            );
            return;
        }

        console.error("Erro ao atualizar projeto:", erro);

        responderErro(
            res,
            500,
            "Erro interno ao atualizar o projeto."
        );
    }
}


async function excluirProjeto(req, res) {
    res.setHeader("Content-Type", "application/json");

    const id = Number(req.url.split("/").pop());

    if (!Number.isInteger(id) || id <= 0) {
        responderErro(
            res,
            400,
            "O ID do projeto deve ser um número inteiro positivo."
        );
        return;
    }


    try {

        const projetoExcluido = await projetosService.excluirProjeto(id);

        if (projetoExcluido === null) {
            responderErro(res, 404, "Projeto não encontrado.");
            return;
        }

        res.statusCode = 200;
        res.end(JSON.stringify(projetoExcluido));

    } catch (erro) {
        console.error("Erro ao excluir projeto:", erro);

        responderErro(
            res,
            500,
            "Não foi possível excluir o projeto."
        );
    }
}



module.exports = {
    listarProjetos,
    criarProjeto,
    atualizarProjeto,
    excluirProjeto
};