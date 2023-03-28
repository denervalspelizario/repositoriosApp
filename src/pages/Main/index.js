import React, {useState, useCallback} from 'react'

import { Container, Form, SubmitButton } from './styles'
import {FaGithub, FaPlus} from 'react-icons/fa' // import de icones nao esque de instalar com o comando  npm install react-icons

import api from '../../services/api'  // importando a api que é a base de url que usaremos para requisição



export default function Main() {

  const [newRepo, setNewRepo] = useState('')
  const [repositorios, setRepositorios] = useState([])

  function dadoInput(e){
    setNewRepo(e.target.value) // ou seja o dado digitado no input aciona a funcao que joga esse dado na state newRepo automaticamente
    
  }

  const handleSubmit = useCallback((e) => {

    async function submit(){

      e.preventDefault(); // para não atualizar a pagina

      const response =  api.get(`respos/${newRepo}`)  // concatena a base url(api) com o dado digitado no input atravez do newRepo e adiciona na const

      const data = { // const recebe apenas o full_name de data 
        name : response.data.full_name,
      }

      setRepositorios([...repositorios, data]) //atualiza as states com 

      setNewRepo('') // zerando a state
    }

    submit()// chama a funcao assincrona senão ela não funciona 

  }, [newRepo, repositorios]) // será chamada assim que atualizar qualquer info das states newRepo ou repositorios
    
  

  return (
    <Container>
      <h1>
        <FaGithub />
        Meus Repositorios
      </h1> 
      <Form onSubmit={handleSubmit}>
        <input  
          type='text' 
          placeholder='adicionar repositorios' 
          value={newRepo} // input inicia com valor da state newRepo
          onChange={dadoInput} //ao digitar acessa o dado e joga na funcao dadoInput
        />

        <SubmitButton>
          <FaPlus   color='#FFF' size={14}  />
        </SubmitButton>

      </Form>

      
    </Container>
  )
}

