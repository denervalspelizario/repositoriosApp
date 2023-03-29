
import styled, {keyframes, css} from "styled-components";



// Criando animações
const animate = keyframes`

from {
  transform: rotate(0deg);

}
to {
  transform: rotate(360deg);
}

`;



export const Container = styled.div`
  max-width: 700px;
  background: #FFF;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0,0,0, 0.2);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    align-items: center;
    flex-direction: row;

    svg {
      margin-right: 10px;
    }
  }
`;

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid #DDD;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 17px;
  }

`;
export const SubmitButton = styled.button.attrs(props => ({  // atebção a sintaxe para adicionar um dado via props no button
  type: 'submit',  // botao do tipo submit
  disabled: props.loading // se for 1(true) ele desativa o botão
}))`
  background: #0d2636;
  border: 0;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled]{ // quando botao estiver disabled

    cursor: not-allowed; //bloquando o cursor
    opacity: 0.5; 

  }

  ${props => props.loading && // acessando as props - loading estando true
    css`
      svg {
        animation: ${animate} 2s linear infinite; // acessando o svg o icon adicionando a animate(animacao criada linha 7) de maneira infinita enquanto estiver true
      }
    `
  
  }

`;