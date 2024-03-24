import Requisicoes from "../req_api.js"
import { useState, useEffect } from "react"

export default function Professor(){
    
    const[buscar, setBuscar] = useState([])
    const[dados, setDados] = useState({
        nome: '',
        email: '',
        telefone: '',
    })

    // prepara o objeto para enviar
    const preparaPost = (chave,valor)=>{
        let corpo = {...dados, [chave]:valor}
        setDados(corpo)
        console.log(dados)
    }

    // cadastra professor
    async function enviar(e){
        e.preventDefault()
        let api = new Requisicoes()
        let msg =  await api.cadastrarProfessor(dados)

        carregaProfessor()

        alert(msg)
    }

     
    async function carregaProfessor(){
        let api = new Requisicoes()
        let listaProfessor = await api.buscarProfessor('')
        let {listaa} =  listaProfessor

        setBuscar( listaa )
    }

   useEffect(()=>{
    carregaProfessor()
   })

  
    return(
        <div className="div_professor">
            <h1>Cadastro de professor</h1>

            <a href="/">Cadastrar disciplina</a>

            <div className="dados_form">

                <form method="post" onSubmit={(e)=> { enviar(e) }} > 
                    <div>
                        <label htmlFor="">Nome:</label>
                        <input type="text" placeholder="Renato" onChange={(e)=> {preparaPost('nome',e.target.value)}} required />
                    </div>

                    <div>
                        <label htmlFor="">E-mail:</label>
                        <input type="email" placeholder="renato@gmail.com" onChange={(e)=> {preparaPost('email',e.target.value)}} required/>
                    </div>

                    <div>
                        <label htmlFor="">Telefone:</label>
                        <input type="tel" placeholder="(99)99999-9999" onChange={(e)=> {preparaPost('telefone',e.target.value)}} required/>
                    </div>

                    <div>
                        <button  type="submit">Cadastrar</button>
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
                        <td><i class="fa-regular fa-pen-to-square edit"></i></td>
                        <td><i class="fa-solid fa-circle-xmark del"></i></td>
                        </tr>
                    ))
                    }
                </tbody>
                </table>
      </div>

        </div>
    )
}