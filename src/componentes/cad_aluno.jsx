
import Requisicoes from "../req_api.js"
import { useState, useEffect } from "react"

export default function Aluno(){

    const[Alunos,setAlunos] = useState([])
    const[Alunosmatriculados,setAlunosmatriculados] = useState([])
    const[disciplinas,setDisciplinas] = useState([])
    
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

    async function buscarAluno(dados){
        let api = new Requisicoes()

        if(dados === undefined){
            dados = ''
        }

        let buscarAluno = await api.buscarAluno(dados)

        setAlunos(buscarAluno.listaa)
    }


    async function buscarDisciplina(dados){
        let api = new Requisicoes()

        if(dados === undefined){
            dados = ''
        }

        let buscarDisciplina = await api.buscarDisciplina(dados)

        setDisciplinas(buscarDisciplina.listaa)
    }


    useEffect(()=>{
        buscarAluno()
        buscarDisciplina()
        buscarAlunoMatriculado()
        console.log(Alunosmatriculados)
    })


    function matricula(cod,nome){
        document.getElementById('nome_aluno_matricula').value = nome
        document.getElementById('codigo_aluno_matricula').value = cod
    }

  async function enviar_matricula(e){
        e.preventDefault()

        let codigoAluno =  document.getElementById('codigo_aluno_matricula').value
        let codigodisciplina =  document.getElementById('disci').value

        let vincular = {
            codigo_aluno: codigoAluno,
            disciplinas: codigodisciplina
        }

            let api = new Requisicoes()
        
            let buscarDisciplina = await api.matricularAluno(vincular)
    
            alert(buscarDisciplina)
    }


    // cadastra professor
    async function enviar(e){
        e.preventDefault()
        let api = new Requisicoes()

       let msg =  await api.cadastrarAluno(dados)

        alert(msg)
    }


    // Buscar aluno matriculado
    async function buscarAlunoMatriculado(dados){
        let api = new Requisicoes()

        let alunos_matriculados = await api.buscarAluno_matriculado(dados)

        setAlunosmatriculados(alunos_matriculados.listaa)
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
                        <input type="cpf" id='cpf' placeholder="999.999.999-99" onChange={(e)=> {preparaPost('cpf',e.target.value)}} required/>
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

                <h2>Lista de alunos</h2>
                <table class="table" id="tabela">
                <thead>
                    <tr>
                    <th scope="col">Código</th>
                    <th scope="col">Nome</th>
                    <th scope="col">CPF</th>
                    <th scope="col">Telefone</th>
                    </tr>
                </thead>
                <tbody>

                {
                    Alunos.map((aluno)=>(
                        <tr>
                            <td>{aluno.codigo}</td>
                            <td>{aluno.nome}</td>
                            <td>{aluno.cpf}</td>
                            <td>{aluno.telefone}</td>
                            <td style={{ cursor: 'pointer' }} onClick={() => { matricula(aluno.codigo, aluno.nome) }}><i className="fa-solid fa-user"></i></td>
                            <td style={{ cursor: 'pointer' }} onClick={() => { matricula(aluno.codigo,aluno.nome ) }}>Matricular</td>

                        </tr>
                    ))
                }
            
                   
                </tbody>
                </table>
      </div>




    <div className="tabela">

        <h2>Matricular aluno em suas disciplinas</h2>

        <div className="dados_form">

<form method="post" onSubmit={(e)=> { enviar_matricula(e) }} > 
    <div>
        <label htmlFor="nome">Nome:</label>
        <input type="text" id='nome_aluno_matricula' placeholder="Renato" disabled onChange={(e)=> {preparaPost('nome',e.target.value)}} required />
    </div>


        <input type="hidden" id='codigo_aluno_matricula'   required/>


        <div>
                        <label htmlFor="disci">Matricule o aluno na disciplina</label>
                        <select name="disci" id="disci" required >
                            <option value=""></option>
                            {
                                disciplinas.map((item)=>(
                                    <option value={item.codigo} >{item.nome_disciplina}</option>
                                ))
                            }

                        </select>
        </div>

    <div className="btns">
        <div>
            <button id="cadastrar"  type="submit">Cadastrar</button>
        </div>
   </div>

</form>

</div>
     
</div>


<div className="tabela">

<h2>Lista de alunos</h2>
<table class="table" id="tabela">
<thead>
    <tr>
    <th scope="col">Código</th>
    <th scope="col">Aluno</th>
    <th scope="col">CPF</th>
    <th scope="col">Disciplina</th>
    <th scope="col">Professor</th>
    </tr>
</thead>
<tbody>

{
    Alunosmatriculados.map((aluno)=>(
        <tr>
            <td>{aluno.codigo}</td>
            <td>{aluno.nome}</td>
            <td>{aluno.cpf}</td>
            {
                aluno.lista_disciplina.map((dis)=>(
                    <>
                    <td>{dis.nome_disciplina}</td>
                    <td>{dis.professor.nome}</td>
                    
                    </>
                ))
            }                  
        </tr>
    ))
}

   
</tbody>
</table>
</div>

    </div>
    )
}