let projetoEmEdicao = null;

async function carregarProjetos() {
    const listaProjetos = document.getElementById("lista-projetos");

    try {
        const resposta = await fetch("http://localhost:3000/api/projetos");

        if (!resposta.ok) {
            throw new Error("nao foi possivel buscar os projetos.");
        }

        const projetos = await resposta.json();

        listaProjetos.innerHTML = "";

        if (projetos.length === 0) {
            listaProjetos.innerHTML = "<P>Nenhum projeto cadastro ainda.</p>";
            return;

        }

        projetos.forEach((projeto) => {
            const cartao = document.createElement("aticle");
            cartao.classList.add("projeto-card");

            const titulo = document.createElement("h3");
            titulo.textContent = projeto.nome;

            const descricao = document.createElement("p");
            descricao.textContent = projeto.descricao;

            const tecnologias = document.createElement("div");
            tecnologias.classList.add("tecnologia");

            projeto.tecnologias.forEach((tecnologia) => {
                const etiqueta = document.createElement("span");
                etiqueta.classList.add("tecnologias");
                etiqueta.textContent = tecnologia;

                tecnologias.appendChild(etiqueta);
            });


            cartao.appendChild(titulo);
            cartao.appendChild(descricao);
            cartao.appendChild(tecnologias);


            const botaoExcluir = document.createElement("button");
            botaoExcluir.textContent = "Excluir projeto";
            botaoExcluir.classList.add("botao-excluir");


            botaoExcluir.addEventListener("click", () => {
                excluirProjeto(projeto.id);
            });



            const botaoEditar = document.createElement("button");
            botaoEditar.textContent = "Editar projeto";
            botaoEditar.classList.add("botao-editar");


            botaoEditar.addEventListener("click", () => {
                document.getElementById("nome").value = projeto.nome;
                document.getElementById("descricao").value = projeto.descricao;
                document.getElementById("tecnologias").value =
                    projeto.tecnologias.join(", ");


                projetoEmEdicao = projeto.id;

                document.querySelector("#form-projeto button[type='submit']")
                    .textContent = "Salvar alterações";

                document.getElementById("form-projeto").scrollIntoView({
                    behavior: "smooth"
                });
            });

            cartao.appendChild(botaoEditar);
            cartao.appendChild(botaoExcluir);
            listaProjetos.appendChild(cartao);


        });
    } catch (erro) {
        console.error("Erro ao carregar projetos:", erro);

        listaProjetos.textContent = "nao foi possivel carregar os projetos. Verifique se o servidor esta funcionando.";
    }
}

carregarProjetos();


async function excluirProjeto(id) {
    const confirmar = confirm(
        "Tem certeza de que deseja excluir este projeto?"
    );

    if (!confirmar) {
        return;
    }

    try {
        const resposta = await fetch(
            `http://localhost:3000/api/projetos/${id}`,
            {
                method: "DELETE"
            }
        );

        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(
                resultado.erro || "Não foi possível excluir o projeto."
            );
        }

        alert("Projeto excluído com sucesso!");

        await carregarProjetos();

    } catch (erro) {
        console.error("Erro ao excluir projeto:", erro);
        alert(erro.message);
    }
}



const formulario = document.getElementById("form-projeto");

formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const descricao = document.getElementById("descricao").value.trim();

    const tecnologias = document
        .getElementById("tecnologias")
        .value
        .split(",")
        .map((tecnologia) => tecnologia.trim())
        .filter((tecnologia) => tecnologia !== "");


    try {

        const resposta = await fetch(
            projetoEmEdicao !== null
                ? `http://localhost:3000/api/projetos/${projetoEmEdicao}`
                : "http://localhost:3000/api/projetos",
            {
                method: projetoEmEdicao !== null ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome,
                    descricao,
                    tecnologias
                })
            }
        );


        const resultado = await resposta.json();

        if (!resposta.ok) {
            throw new Error(
                resultado.erro || "Não foi possível cadastrar o projeto."
            );
        }


        if (projetoEmEdicao !== null) {
            alert("Projeto atualizado com sucesso!");
        } else {
            alert("Projeto cadastrado com sucesso!");
        }

        projetoEmEdicao = null;

        formulario.reset();

        formulario.querySelector("button[type='submit']").textContent =
            "Cadastrar projeto";

        await carregarProjetos();


    } catch (erro) {
        console.error("Erro ao cadastrar projeto:", erro);
        alert(erro.message);
    }
});
