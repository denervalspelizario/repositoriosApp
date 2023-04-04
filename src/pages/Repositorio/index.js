import React,{useEffect, useState} from 'react'
import api from '../../services/api'
import { Container, Owner, Loading, BackButton, IssuesList, PageAction } from './styles'
import {  FaArrowLeft } from 'react-icons/fa'

export default function Repositorio({match}) {

  const [repositorio, setRepositorio] = useState({}) // se inicia como objeto vazio pois receberá apenas 1 objeto
  const [issues, setIssues] = useState([]) // se inicia como objeto vazio, pois recebera varios objetos 
  const [loading, setLoading] = useState(true) 
  const [page, setPage] = useState(1); // state para controlar as page iniciando com 1


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

  // FUNCÃO PARA AVANÇAR OU VOLTAR PAGINA - OBS ALTERANDO ELA CHAMA O useEffect ABAIXO
  function handlePage(action){
    setPage(action === 'back' ? page - 1 : page + 1) // ao clicar em um dos botoes ativa handlePage se for back -1 page senao será  next então + 1 page
  }

  // FUNÇÃO LINKADA A HANDLEPAGE QUE ALTERA A STATE SETISSUES COM  A RESQUISIÇÃO COM PARAMETROS = OPEN, OQUE ESTIVER NO PAGE E MAXIMO DE 5
  useEffect(() => {

    async function loadIssue(){
     
      const nomeRepo = decodeURIComponent(match.params.repositorio)  // adicionando em nomeRepo o caminho da url que estamos

      const response = await api.get(`/repos/${nomeRepo}/issues`, { // response recebe a requisição com os parametros abaixo
        params: {
          state: 'open', // pegando só os estados do tipo open
          page: page, // a page será a do state page, que dependendo do botao cliclado pode ser -1 ou +1 
          per_page: 5 // maximo de 5 por pagina
        }

      })

      setIssues(response.data)// state issues recebendo a requisição para renderiza-la
    }

    loadIssue() // chamando a funcão seão ela não funciona

  },[match.params.repositorio, page])  // ou seja clicou nos botoes que ativam handlepage já chama esta função   



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
        <PageAction>
          <button 
            type='button' 
            onClick={()=>  handlePage('back')}
            disabled={page < 2} // se page for menor que 2 ativa o disabled olhar em styles
          >
            Voltar
          </button>

          <button type='button' onClick={()=> handlePage('next')}>
            Proxima
          </button>
        </PageAction>
          
      </Container>
  )
}