import React, {useState, useCallback} from 'react'

import { Container, Form, SubmitButton, List, DeleteButton } from './styles'
import {FaGithub, FaPlus, FaSpinner, FaBars, FaTrash} from 'react-icons/fa' // import de icones nao esque de instalar com o comando  npm install react-icons

import api from '../../services/api'  // importando a api que é a base de url que usaremos para requisição



export default function Main() {

  const [newRepo, setNewRepo] = useState('')
  const [repositorios, setRepositorios] = useState([]) // state que recebera de inicio um array vazio
  const [loading, setLoading] = useState(false)

  function dadoInput(e){
    setNewRepo(e.target.value) // ou seja o dado digitado no input aciona a funcao que joga esse dado na state newRepo automaticamente
    
  }

  const buscaApi = useCallback((e) => { // Uma função callback é aquela que é executada em decorrência de algum evento no caso alteração de states newRepo ou repositorios

    e.preventDefault(); // para não atualizar a pagina

    async function submit(){
      setLoading(true) // loading funcionando
      try {// deu certo
                                                             // get  = pegar, trazer informação
        const response =  await api.get(`repos/${newRepo}`)  // concatena a base url(api) com o dado digitado no input atravez do newRepo e adiciona na const response
                                                             // ou seja com essa concatenacao acessa api desejada 

        // acessa somente o full_name do repositorio desejado                                                        
        const data = {                    
          name : response.data.full_name,  // const recebe apenas o full_name de data que é somente este item que interessa neste momento
                                           // se colocar apenas data ele retorna toda a data e não é interessante 
        }

                                                 // e adiciona esse repositorio desejado aos outro que ja foram digitados 
        setRepositorios([...repositorios, data]) //atualiza as states com  a array que ja existe somado a dado que vem de data
                                                 // ou seja pega tudo que já tem e adiciona  com o  data 

        setNewRepo('') // zerando a state paa limpar o input
      }
      catch(error){ // deu erro
        
        console.log(error) // mensagem de erro
      }
      finally{ // terminou a execução da busaca da api desliga o loading
        setLoading(false)
      }
    }

    submit()// chama a funcao assincrona senão ela não funciona 

  }, [newRepo, repositorios]) // será chamada assim que atualizar qualquer info das states newRepo ou repositorios
    

  // deletando um repositorio
  // será usado um use callback ao invez de um função simple pois vai manipular o dado de uma state incluse no 
  // firebase é melhor usar um callback
  const deleteRepo = useCallback((repo) => { // este repo é o repo.name la que foi clicado o icone de excluir
                                             

    const encontrar = repositorios.filter(r => r.name !== repo) // encontrar vai receber todos os repositorio que forem DIFERENTES do repo.name
                                                                // ou seja atravez do filter ele pega todos os respositorios MENOS aquele que foi cliclado
                                                                
    setRepositorios(encontrar) // e depois de encontrar receber os repositorios menos oq foi deletado é adicionado na state repositorios                                                         


  },[repositorios]) // como a state repositorio foi alterada dentro dela ela sera chamada aqui
  

  return (
    <Container>
      <h1>
        <FaGithub />
        Meus Repositorios
      </h1> 
      <Form onSubmit={buscaApi}>
        <input  
          type='text' 
          placeholder='adicionar repositorios' 
          value={newRepo} // input inicia com valor da state newRepo
          onChange={dadoInput} //ao digitar acessa o dado e joga na funcao dadoInput
        />

        <SubmitButton 
          loading={loading ? 1 : 0} // repassando via props para constrolar o loading se for 1(true) senao 0(false)
        >
          {loading ? ( 
            
            <FaSpinner color='#FFF' size={14} /> // se o loading estiver true(esta fazendo o carregamento ainda) retorna icon de carregando
          
            ) : (
            
            <FaPlus color='#FFF' size={14} /> // se estiver false(fez o carregamento) icon normal de +
          )
        
          }          
        </SubmitButton>

      </Form>

      <List>
        {repositorios.map( repo => (  // lista que vai percorrer todos os repositorios guardados na state

          <li key={repo.name}> {/* a key sera o nome porque os nomes são unicos mesmo*/}
            
            <span> {/* vai retornar somente os nomes dos repositorios*/}
              <DeleteButton 
                onClick={() => deleteRepo(repo.name)}  // botao de exclusão de repositorio  - com funcao de exclusao do repo    
              > 
                <FaTrash size={14}/>
              </DeleteButton>  
              {repo.name}
            </span>   
            <a href=""> <FaBars size={24} /></a>
          </li>

        ))}
      </List>

      
    </Container>
  )
}

