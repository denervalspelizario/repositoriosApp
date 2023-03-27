
import Rotas from "./routes";
import GlobalStyle from "./pages/styles/global";

export default function App(){


  return(
    <>                 {/* Para GlobalStyle precisa estar envolto de algo por isso o <> </>, não é recomendado usar div ficar atento a isso */}
    <GlobalStyle/>
    <Rotas/>  
    </>
     
  )
}


