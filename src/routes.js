import { BrowserRouter, Routes, Route} from 'react-router-dom'; // importando as confuigs para rotas
import Main from './pages/Main';
import Repositorio from './pages/Repositorio';


const Rotas = () => (
  <BrowserRouter>
      <Routes>
          <Route exact path='/' element={ <Main/> } />
          <Route 
            path='/Repositorio/:repositorio' // esse /:repositorio eu estou dizendo que estou esperando um parametro de repositorio não é outra rota, precisa de parametro
                                             // ou seja precisa de um parametro adicionado pra rota funcionar se colocar http://localhost:3000/Repositorio ela não funciona         
            element={ <Repositorio/> } 
          />
      </Routes>
  </BrowserRouter>
);

export default Rotas;