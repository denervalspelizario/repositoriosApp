import React,{useEffect, useState} from 'react'
import api from '../../services/api'
import { Container, Owner, Loading } from './styles'

export default function Repositorio({match}) {

  const [repositorio, setRepositorio] = useState({}) // se inicia como objeto vazio pois receberá apenas 1 objeto
  const [issues, setIssues] = useState([]) // se inicia como objeto vazio, pois recebera varios objetos 
  const [loading, setLoading] = useState(true) 


  // FUNCAO DIDMOUNT  QUE FAZ 2 REQUISIÇÕES(COM ALGUNS PARAMS) E ADICIONA NAS STATES REPOSITORIO E ISSUES 
  useEffect(() => {

    async function load(){
  
      const nomeRepo = decodeURIComponent(match.params.repositorio) // nomeRepo recebendo caminho do repositorio
  
      
      const [repositorioData, issuesData] =  await Promise.all([ // o Promise fazendo DUAS requisições juntas e devolve dentro de uma array
        api.get(`/repos/${nomeRepo}`), // req vai para repsoitorioData
        
        api.get(`/repos/${nomeRepo}/issues`, { // req vai para issuesData
          params: { // params do axios
            state:'open', // apenas os open
            per_page: 5  // limitado a 5 por pagina
          }
        })
       

      ]);
  
      setRepositorio(repositorioData.data) // adicionando a state repositorio a requisição repositorioData
      setIssues(issuesData.data) // adicionando a state issues a requisição issuesData
      setLoading(false)
    }
    load() // chamando a funcao
  
  },[match.params.repositorio]) // 


  if(loading){
    return(
      <Loading>
        Carregando ....
      </Loading>
    )
  }
  return (
      <Container>
        <Owner>
          <img 
            src={repositorio.owner.avatar_url}  
            alt={repositorio.owner.login} 
          />
          <h1>{repositorio.nome}</h1>
          <p>{repositorio.description}</p>

        </Owner>
          
      </Container>
  )
}