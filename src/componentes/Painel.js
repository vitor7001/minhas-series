import React from 'react';
import { Jumbotron} from 'reactstrap';

function Painel() {
    return(

    <div className='container mt-5' align='center'>
      <Jumbotron className='painel' align='center'>
        <h1 className='display-3'>Minhas Series!</h1>
        <p className='lead'>Um app para desenvolver habilidades em conjuno ao Evento Hands-on
        do canal: 
        <a href='https://www.youtube.com/channel/UC07JWf9A0B1scApbS1Te7Ww'
         className='px-md-5 btn btn-primary' rel='noopener noreferrer' target='_blank'>DevPleno</a>
        <br /> A quem sou muito grato pelo conteúdo disponibilizado de forma gratuita!
        </p>
        <hr className='my-2' />
        <p>Irei colocar todos os códigos utilizados no meu GitHub pessoal ->
        <a href='https://github.com/vitor7001/minhas-series'
         className='px-md-5 btn btn-success' rel='noopener noreferrer' target='_blank'>Minhas Séries</a>
         </p>
      </Jumbotron>
    </div>
)
}

export default Painel;