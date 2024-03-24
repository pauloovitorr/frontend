import Requisicoes from "../req_api.js"
import { useEffect, useState } from "react"

export default function CadastroDisciplina(){

    const [nome_disciplina, setnome_disciplina] = useState('')
    const [cod_professor, setCod_professor] = useState('')
    const [inicio, setinicio] = useState('')
    const [termino, settermino] = useState('')


    const [professores, setProfessores] = useState([])
    const [listaDisci, setlistaDisci] = useState([])

    
    const[dados, setDados] = useState({
        nome_disciplina: '',
        inicio: '',
        termino: '',
        codigo_professor: ''
    })

    let api = new Requisicoes()

    //prepara o objeto para enviar
    async function preparaPost(e){
        e.preventDefault()

        let postar = {
            nome_disciplina: nome_disciplina,
            inicio: inicio,
            termino: termino,
            codigo_professor: cod_professor
        }

        let api = new Requisicoes()
        let listaProfessor = await api.cadastrarDisciplina(postar)

        alert(listaProfessor)
    
    }


async function carregaProfessor(){
    
    let listaProfessor = await api.buscarProfessor('')
    let {listaa} =  listaProfessor

    setProfessores( listaa )
}

async function delDisciplina(codigo){

    if(prompt('Deseja realmente excluir a disciplina ?')){
        let cod = {
            codigo: codigo
        }
        let exluir = await api.deleteDisciplina(cod)
        if(exluir){
            alert('Disciplina excluida com sucesso')
        }
        
    }

    carregaDisciplina()
}

function editprofessor(cod,nome,ini,ter, cod_professor ,nomeProf){
     
    document.querySelector('#cod_professor').value = cod_professor
    document.querySelector('#cod_disciplina').value = cod
    document.querySelector('#nomeDis').value = nome
    document.getElementById('profe').value = nomeProf    
    document.querySelector('#inicio').value = ini
    document.querySelector('#termino').value = ter
    document.querySelector('#edit').disabled = false
    document.querySelector('#cadastrar').disabled = true
}


useEffect(()=>{
    carregaDisciplina()
})

async function carregaDisciplina(){

    let listaDisciplina = await api.buscarDisciplina('')
    let {listaa} = listaDisciplina

   setlistaDisci(listaa)

   //console.log(listaa)

}

 async function editarDisciplina(){
    let codigo_professor      = document.querySelector('#cod_professor').value
    let codigo      = document.querySelector('#cod_disciplina').value
    let nome_dis    = document.querySelector('#nomeDis').value
    let inicio      = document.querySelector('#inicio').value 
    let termino     = document.querySelector('#termino').value 

    let obj_atualizar = {
        codigo: codigo,
        nome_disciplina: nome_dis,
        inicio: inicio,
        termino: termino,
        codigo_professor: codigo_professor
    }

    let atualizar = await api.atualizaDisciplina(obj_atualizar)
}


    return(
        <div className="div_professor">
            <h1>Cadastro de disciplina</h1>

            <a href="/professor">Cadastrar Professor</a>

            <div className="dados_form">

                <form method="post" onSubmit={(e)=> preparaPost(e)}> 
                    <div>
                        <label htmlFor="nomeDis">Nome da disciplina:</label>
                        <input type="text" id="nomeDis" placeholder="Programação fullstack 2" onChange= {(e)=> setnome_disciplina(e.target.value)}  required />
                    </div>

                    <div>
                        <label htmlFor="profe">Professor responsável:</label>
                        <select name="" id="profe" required onClick={carregaProfessor} onChange= {(e)=> setCod_professor(e.target.value)} >
                            <option value="">Selecione</option>
                            {
                                professores.map((item)=>(
                                    <option value={item.codigo} >{item.nome}</option>
                                ))
                            }

                        </select>
                    </div>

                    <div>
                        <label htmlFor="inicio">Inicio das aulas:</label>
                        <input type="text" id="inicio" placeholder="15/02/2024"  onChange= {(e)=> setinicio(e.target.value)} required/>
                    </div>

                    <div>
                        <label htmlFor="termino">Término das aulas:</label>
                        <input type="text" id="termino" placeholder="15/06/2024"  onChange= {(e)=> settermino(e.target.value)} required/>
                    </div>

                 <input type="hidden" id="cod_disciplina" />
                 <input type="hidden" id="cod_professor" />

                   <div className="btns">
                        <div>
                            <button id="cadastrar"  type="submit">Cadastrar</button>
                        </div>

                        <div>
                            <p id="edit" onClick={()=> editarDisciplina() } disabled={true}>Editar</p>
                        </div>
                   </div>

                </form>

            </div>

            <div className="tabela">

                <h3>Lista de disciplinas</h3>

                <table class="table" id="tabela">

                <thead>

                    <tr>
                        <th scope="col">Disciplina</th>
                        <th scope="col">Inicio</th>
                        <th scope="col">Termino</th>
                        <th scope="col">Professor</th>
                        <th scope="col">Email</th>
                        <th scope="col">Telefone</th>
                    </tr>

                </thead>
                <tbody>
                    {
                    listaDisci.map((disciplina)=>(
                    <tr>
                        <td scope="col">{disciplina.nome_disciplina}</td>
                        <td scope="col">{disciplina.inicio}</td>
                        <td scope="col">{disciplina.termino}</td>
                        <td scope="col">{disciplina.professor.nome}</td>
                        <td scope="col">{disciplina.professor.email}</td>
                        <td scope="col">{disciplina.professor.telefone}</td>
                        <td><i class="fa-regular fa-pen-to-square edit" onClick={()=> {editprofessor(disciplina.codigo, disciplina.nome_disciplina,disciplina.inicio,disciplina.termino,disciplina.professor.codigo,disciplina.professor.nome)}} ></i></td>
                        <td><i class="fa-solid fa-circle-xmark del" onClick={()=> {delDisciplina(disciplina.codigo)}}></i></td>
                    </tr>
                    ))
                    }
                </tbody>
                </table>
      </div>

        </div>
    )

}