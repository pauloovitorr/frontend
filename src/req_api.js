export default class Requisicoes{

    async cadastrarProfessor(dados) {

      try{
        let apiProfessor = 'http://localhost:4000/professor'

        let resposta = await fetch(`${apiProfessor}`, {
            method: 'POST',
            headers:{
                'Content-type': 'Application/json'
            },
            body: JSON.stringify(dados)
        })

        if(!resposta.ok){
            throw new Error('Resposta da rede não está ok');
        }
        else{
            return 'Professor cadastrado com sucesso !'
        }
        
    }
    catch(erro){
        return "Erro o cadastrar professor: "  + erro
    }

}


      async buscarProfessor(dados) {

        try{
          let apiProfessor = 'http://localhost:4000/professor'
  
          let resposta = await fetch(`${apiProfessor}/${dados}`, {
            method: 'GET',
            headers:{
                'Content-type': 'Application/json'
            }
          })
  

          if(!resposta.ok){
              throw new Error('Resposta da rede não está ok');
          }
          else{
              let lista_professor = await resposta.json()
              return lista_professor
          }
          
      }
      catch(erro){
          return "Erro o cadastrar professor: "  + erro
      }
  
    }

    async  atualizarProfessor(dados) {
        
    try{
        let apiDisciplina = 'http://localhost:4000/professor'
  
        let resposta = await fetch(`${apiDisciplina}`, {
            method: 'PUT',
            headers:{
                'Content-type': 'Application/json'
            },
            body: JSON.stringify(dados)
        })
  
        if(!resposta.ok){
            throw new Error('Resposta da rede não está ok');
        }
        else{
            return 'Professor atualizado com sucesso !'
        }
        
    }
    catch(erro){
        return "Erro o cadastrar professor: "  + erro
    }

}

async deleteProfessor(codigo){

    console.log(codigo)
    try{
        let apiProfessor = 'http://localhost:4000/professor'

        let resposta = await fetch(`${apiProfessor}`, {
        method: 'DELETE',
        headers:{
            'Content-type': 'Application/json'
        },
        body: JSON.stringify(codigo)
        
        })

        if(!resposta.ok){
            throw new Error('Resposta da rede não está ok');
        }
        else{
            return 'Professor excluido com sucesso'
        }
    }
        catch(erro){
            return "Erro ao excluir professor: "  + erro
        }
    
}


    //Disciplina

    async cadastrarDisciplina(dados) {

        try{
          let apiDisciplina = 'http://localhost:4000/disciplina'
  
          let resposta = await fetch(`${apiDisciplina}`, {
              method: 'POST',
              headers:{
                  'Content-type': 'Application/json'
              },
              body: JSON.stringify(dados)
          })
  
          if(!resposta.ok){
              throw new Error('Resposta da rede não está ok');
          }
          else{
              return 'Disciplina cadastrada com sucesso !'
          }
          
      }
      catch(erro){
          return "Erro o cadastrar professor: "  + erro
      }
  
  }

  async buscarDisciplina(dados) {

    try{
      let apiProfessor = 'http://localhost:4000/disciplina'

      let resposta = await fetch(`${apiProfessor}/${dados}`, {
        method: 'GET',
        headers:{
            'Content-type': 'Application/json'
        }
      })

      if(!resposta.ok){
          throw new Error('Resposta da rede não está ok');
      }
      else{
          let lista_professor = await resposta.json()
          return lista_professor
      }
      
  }
  catch(erro){
      return "Erro o cadastrar professor: "  + erro
  }

}

async deleteDisciplina(codigo){
    try{
        let apiProfessor = 'http://localhost:4000/disciplina'

        let resposta = await fetch(`${apiProfessor}`, {
        method: 'DELETE',
        headers:{
            'Content-type': 'Application/json'
        },
        body: JSON.stringify(codigo)
        
        })

        if(!resposta.ok){
            throw new Error('Resposta da rede não está ok');
        }
        else{
            return 'Disciplina excluida com sucesso'
        }
    }
        catch(erro){
            return "Erro ao excluir disciplina: "  + erro
        }
    
}

async atualizaDisciplina(dados) {

    try{
      let apiDisciplina = 'http://localhost:4000/disciplina'

      let resposta = await fetch(`${apiDisciplina}`, {
          method: 'PUT',
          headers:{
              'Content-type': 'Application/json'
          },
          body: JSON.stringify(dados)
      })

      if(!resposta.ok){
          throw new Error('Resposta da rede não está ok');
      }
      else{
          return 'Disciplina cadastrada com sucesso !'
      }
      
  }
  catch(erro){
      return "Erro o cadastrar professor: "  + erro
  }

}


}