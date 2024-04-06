import Requisicoes from "../req_api.js"
import { useState, useEffect } from "react"

export default function Aluno(){
    
    const[dados, setDados] = useState({
        nome: '',
        cpf: '',
        telefone: '',
    })

    // prepara o objeto para enviar
    const preparaPost = (chave,valor)=>{
        let corpo = {...dados, [chave]:valor}

        console.log(corpo)

        setDados(corpo)
    }

    // cadastra professor
    async function enviar(e){
        e.preventDefault()
        let api = new Requisicoes()
        let msg =  await api.cadastrarAluno(dados)

        alert(msg)
    }

   
      return(
        <div className="div_professor">
            <h1>Cadastro de alunos</h1>

            <a href="/disciplina">Cadastrar disciplina</a> <br />
            <a href="/professor">Cadastrar Professor</a> <br />

            <div className="dados_form">

                <form method="post" onSubmit={(e)=> { enviar(e) }} > 
                    <div>
                        <label htmlFor="nome">Nome:</label>
                        <input type="text" id='nome' placeholder="Renato" onChange={(e)=> {preparaPost('nome',e.target.value)}} required />
                    </div>

                    <div>
                        <label htmlFor="cpf">CPF:</label>
                        <input type="cpf" id='cpf' placeholder="renato@gmail.com" onChange={(e)=> {preparaPost('cpf',e.target.value)}} required/>
                    </div>

                    <div>
                        <label htmlFor="telefone">Telefone:</label>
                        <input type="tel" id='telefone' placeholder="(99)99999-9999" onChange={(e)=> {preparaPost('telefone',e.target.value)}} required/>
                    </div>

                    <div className="btns">
                        <div>
                            <button id="cadastrar"  type="submit">Cadastrar</button>
                        </div>
                   </div>

                </form>

            </div>

            <div className="tabela">
                <table class="table" id="tabela">
                <thead>
                    <tr>
                    <th scope="col">Código</th>
                    <th scope="col">Nome</th>
                    <th scope="col">Email</th>
                    <th scope="col">Telefone</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    buscar.map((disciplina) => (
                        <tr>
                        <td>{disciplina.codigo}</td>
                        <td>{disciplina.nome}</td>
                        <td>{disciplina.email}</td>
                        <td>{disciplina.telefone}</td>
                       
                        </tr>
                    ))
                    }
                </tbody>
                </table>
      </div>

        </div>
    )
}