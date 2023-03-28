import React from 'react'

import { Container, Form, SubmitButton } from './styles'
import {FaGithub, FaPlus} from 'react-icons/fa' 

export default function Main() {
  return (
    <Container>
      <h1>
        <FaGithub />
        Meus Repositorios
      </h1> 
      <Form>
        <input  type='text' placeholder='adicionar repositorios' />

        <SubmitButton>
          <FaPlus   color='#FFF' size={14}  />
        </SubmitButton>

      </Form>

      
    </Container>
  )
}

