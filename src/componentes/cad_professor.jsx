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
    }

    // cadastra professor
    async function enviar(e){
        e.preventDefault()
        let api = new Requisicoes()
        let msg =  await api.cadastrarProfessor(dados)

        carregaProfessor()

        alert(msg)
    }

   async function delprofessor(cod){

    let obj_codigo = {
        codigo:cod
    }


    if(prompt('Deseja excluir Professor')){
        let api = new Requisicoes()
        let msg = await api.deleteProfessor(obj_codigo)
        alert(msg)
    }

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

   function preparaEdit(cod,nome,email,telefone){
   
     document.querySelector('#codProfessor').value = cod
     document.querySelector('#nome').value = nome
     document.querySelector('#email').value = email
     document.querySelector('#telefone').value = telefone
     document.querySelector('#edit').disabled = false
   }

   async function editprofessor(){
   let cod =  document.querySelector('#codProfessor').value 
   let nome =  document.querySelector('#nome').value 
   let email =  document.querySelector('#email').value
   let telefone =  document.querySelector('#telefone').value


     let obj_editProfe = {
        codigo: cod,
        nome: nome,
        email: email,
        telefone: telefone
     }

     let api = new Requisicoes()
     let msg = await api.atualizarProfessor(obj_editProfe)

     alert(msg)

   }
  
    return(
        <div className="div_professor">
            <h1>Cadastro de professor</h1>

            <a href="/">Cadastrar disciplina</a>

            <div className="dados_form">

                <form method="post" onSubmit={(e)=> { enviar(e) }} > 
                    <div>
                        <label htmlFor="nome">Nome:</label>
                        <input type="text" id='nome' placeholder="Renato" onChange={(e)=> {preparaPost('nome',e.target.value)}} required />
                    </div>

                    <div>
                        <label htmlFor="email">E-mail:</label>
                        <input type="email" id='email' placeholder="renato@gmail.com" onChange={(e)=> {preparaPost('email',e.target.value)}} required/>
                    </div>

                    <div>
                        <label htmlFor="telefone">Telefone:</label>
                        <input type="tel" id='telefone' placeholder="(99)99999-9999" onChange={(e)=> {preparaPost('telefone',e.target.value)}} required/>
                    </div>

                    <div className="btns">
                        <div>
                            <button id="cadastrar"  type="submit">Cadastrar</button>
                        </div>

                        <input type="hidden" id="codProfessor" />

                        <div>
                            <p id="edit" onClick={()=> editprofessor() } disabled={true}>Editar</p>
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
                        <td><i class="fa-regular fa-pen-to-square edit" onClick={()=> preparaEdit(disciplina.codigo,disciplina.nome,disciplina.email,disciplina.telefone ) }></i></td>
                        <td><i class="fa-solid fa-circle-xmark del" onClick={()=> {delprofessor(disciplina.codigo)}}></i></td>
                        </tr>
                    ))
                    }
                </tbody>
                </table>
      </div>

        </div>
    )
}