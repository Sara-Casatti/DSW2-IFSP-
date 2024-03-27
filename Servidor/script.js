function buscaDados(){
    fetch("https://ifsp.ddns.net/webservices/carro/carro")
    .then(
        (resultado) => {
            console.log(resultado)
            return resultado.json()
        }
    ).then(
        (dados) => {
            criaTabela(dados)
        }
    ).catch(
        (err) => {
            console.log(err)
        }
    )
}

let div = document.createElement("div")
div.setAttribute("class", "container")
document.body.append(div)

function criaTabela(dados){
    let table = document.createElement("table")
    let th0 = document.createElement("th")
    th0.innerText = "Id:"
    let tr = document.createElement("tr")
    let th1 = document.createElement("th")
    th1.innerText = "Nome:"
    let th2 = document.createElement("th")
    th2.innerText = "Ano:"
    let th3 = document.createElement("th")
    th3.innerText = "Preço:"
    let th4 = document.createElement("th")
    th4.innerText = "Potência:"
    let th5 = document.createElement("th")
    th5.innerText = "Fabricante:"
    let th6 = document.createElement("th")
    th6.innerText = "Delete:"
    let th7 = document.createElement("th")
    th7.innerText = "Alterar:"

    tr.append(th0, th1, th2, th3, th4, th5, th6, th7)
    table.append(tr)
    div.append(table)
    for(let i = 0; i < dados.length; i++){
        criaLinha(dados[i], table)
    }
}

function criaLinha(dados, table) {
    let tr = document.createElement("tr")
    tr.setAttribute("id", `linha${dados.id}`)
    let id = document.createElement("td")
    id.innerText = dados.id
    let nome = document.createElement("td")
    nome.innerText = dados.nome
    let ano = document.createElement("td")
    ano.innerText = dados.ano
    let preco = document.createElement("td")
    preco.innerText = dados.preco
    let potencia = document.createElement("td")
    potencia.innerText = dados.potencia
    let fabricante = document.createElement("td")
    fabricante.innerText = dados.fabricante
    let tdDeletar = document.createElement("td")
    let botaoDeletar = document.createElement("button")
    botaoDeletar.innerText = "Deletar"
    tdDeletar.append(botaoDeletar)
    botaoDeletar.addEventListener("click", () => deletar(id.innerText))
    let tdAlterar = document.createElement("td")
    let alterar = document.createElement("button")
    alterar.innerText = "Alterar"
    tdAlterar.append(alterar)
    alterar.addEventListener("click", () => fAlterar(dados))
    
    tr.append(id, nome, ano, preco, potencia, fabricante, tdDeletar, tdAlterar)
    table.append(tr)
}

function deletar(id){
    let options = {
        method: "DELETE",
        body: JSON.stringify({
            id: id
        }),
        headers: {
            "Content-type": "application/json"
        }
    }
    fetch(`https://ifsp.ddns.net/webservices/carro/carro/${id}`, options).then(() => {
        let linha = document.querySelector(`#linha${id}`)
        linha.remove()
    })
}

buscaDados()

function criaFormulario(form, id, texto, tipo, value) {
   
    let label = document.createElement("label")
    label.setAttribute("for", id)
    label.innerText = texto
    let input = document.createElement("input")
    if (value != "") {
        input.setAttribute("value", value)
    }
    input.setAttribute("name", id)
    input.setAttribute("type", tipo)
    input.setAttribute("id", id)
    
    form.append(label, document.createElement("br"), input, document.createElement("br"))
}

let divForm = document.createElement("div")

let divBotao = document.createElement("div")

let novoCarro = document.createElement("button")
novoCarro.innerText = "Add Carro"
novoCarro.addEventListener("click", function() {
    let form = document.createElement("form")

    criaFormulario(form, "postNome", "Nome:", "text", "")
    criaFormulario(form, "postAno", "Ano:", "number", "")
    criaFormulario(form, "postPreco", "Preço:", "number", "")
    criaFormulario(form, "postPotencia", "Potência:", "text", "")
    criaFormulario(form, "postFabricante", "Fabricante:", "text", "")

    let submit = document.createElement("input")
    submit.setAttribute("type", "Submit")
    submit.setAttribute("value", "Enviar")
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        let nome = document.querySelector("#postNome").value 
        let ano = document.querySelector("#postAno").value 
        let preco = document.querySelector("#postPreco").value 
        let potencia = document.querySelector("#postPotencia").value 
        let fabricante = document.querySelector("#postFabricante").value 

        let options = {
            method: "POST",
            body: JSON.stringify({
            nome: nome,
            ano: ano,
            preco: preco,
            potencia: potencia,
            fabricante: fabricante
        }),
            headers: {
                "Content-type": "application/json"
            }
        }

        fetch("https://ifsp.ddns.net/webservices/carro/carro", options).then((d) => {return d.json()}).then((resp) => {
            form.remove()
            let tabela = document.querySelector("table")
            criaLinha(resp, tabela)
        })
    })

    form.append(submit)
    divForm.append(form)  
})


function fAlterar(dados){
    let form = document.createElement("form")

    criaFormulario(form, "putNome", "Nome:", "text", dados.nome)
    console.log(dados.nome)
    criaFormulario(form, "putAno", "Ano:", "number", dados.ano)
    criaFormulario(form, "putPreco", "Preço:", "number", dados.preco)
    criaFormulario(form, "putPotencia", "Potência:", "text", dados.potencia)
    criaFormulario(form, "putFabricante", "Fabricante:", "text", dados.fabricante)

    let submit = document.createElement("input")
    submit.setAttribute("type", "Submit")
    submit.setAttribute("value", "Enviar")
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        let nome = document.querySelector("#putNome").value 
        let ano = document.querySelector("#putAno").value 
        let preco = document.querySelector("#putPreco").value 
        let potencia = document.querySelector("#putPotencia").value 
        let fabricante = document.querySelector("#putFabricante").value 

        let options = {
            method: "PUT",
            body: JSON.stringify({
                nome: nome,
                ano: ano,
                preco: preco,
                potencia: potencia,
                fabricante: fabricante
            }),
            headers: {
                "Content-type": "application/json"
            }
        }

        fetch(`https://ifsp.ddns.net/webservices/carro/carro/${dados.id}`, options).then( (d) => { return d.json()}).then( (res) => {
            console.log("entreiiii")
            form.remove()
            let linha = document.querySelector(`#linha${dados.id}`)
            linha.remove()
            let tabela = document.querySelector("table")
            criaLinha(res, tabela)
        })
    })
    form.append(submit)
    divForm.append(form)
}

document.body.append(divForm)
divBotao.append(novoCarro)
document.body.append(divBotao)