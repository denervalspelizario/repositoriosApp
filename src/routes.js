import { BrowserRouter, Switch, Route} from 'react-router-dom'; // importando as confuigs para rotas
import Main from './pages/Main';
import Repositorio from './pages/Repositorio';


const Rotas = () => (
  <BrowserRouter>
      <Switch>
          <Route exact path='/' component={Main} />
          <Route 
            exact path='/repositorio/:repositorio' // esse /:repositorio eu estou dizendo que estou esperando um parametro de repositorio não é outra rota, precisa de parametro
                                             // ou seja precisa de um parametro adicionado pra rota funcionar se colocar http://localhost:3000/repositorio ela não funciona         
            component={Repositorio} 
          />
      </Switch>
  </BrowserRouter>
);

export default Rotas;