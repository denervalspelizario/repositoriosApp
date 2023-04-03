import React,{useEffect, useState} from 'react'
import api from '../../services/api'
import { Container, Owner, Loading, BackButton, IssuesList } from './styles'
import {  FaArrowLeft } from 'react-icons/fa'

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
      console.log(issuesData.data)
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
        <BackButton 
          to='/'  // botao que retorna para Main (lembre-se o o import do link é feito la no styles) 
        >
          <FaArrowLeft  color='#0D2636' size={30} />
        </BackButton>
        <Owner>
          <img 
            src={repositorio.owner.avatar_url}  
            alt={repositorio.owner.login} 
          />
          <h1>{repositorio.name}</h1>
          <p>{repositorio.description}</p>
        </Owner>

        <IssuesList>

          {issues.map(issue => ( // percorre todas as issues

            <li 
              key={String(issue.id)} // renderiza em uma li que precisa de uma key porem a key esta number entao tranforma-se em string
            > 
              <img src={issue.user.avatar_url}  alt={issue.user.login}/>
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>

                  {issue.labels.map(label => ( //repassando as issues atravez do map para label
                    <span 
                      key={String(label.id)} // tranformando a key de number em string
                    >
                        {label.name} 
                    </span>
                  ))}
                </strong>

                  <p>{issue.user.login}</p>

              </div>

            </li>

          ))}

        </IssuesList>
          
      </Container>
  )
}