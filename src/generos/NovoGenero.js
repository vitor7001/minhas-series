import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Alert, Container, Row, Col } from 'reactstrap'

function NovoGenero() {
    const [name, setName] = useState('')
    const [sucess, setSucess] = useState(false)
    const onChange = evt => {
        setName(evt.target.value)
    }

    const save = () => {
        axios.post('/api/genres', {
            name
        })
            .then(resp => {
                setSucess(true)
            })
    }


    const validar = () => {
        try {
            //validação para verificar se o campo não está vazio ou com espaços
            if (name.trim() == '') {
                throw new Error('')
            }
            setNomeVazio(false)
            save()
        } catch (error) {
            //window.alert(error)
            setNomeVazio(true)
        }
    }
    const [nomeVazio, setNomeVazio] = useState(false)
    const nomeVazioAlert = (
        <Container>
            <Row>
                <Col xs='auto'>
                    <Alert color="warning" sm={{ size: 'auto', offset: 1 }}>
                        <p>Informe um nome para ser inserido!</p>
                    </Alert>
                </Col>
            </Row>
        </Container>
    )

    if (sucess)
        return <Redirect to='/generos' />

    return (
        <div className='container'>
            <h1>Novo Genêro</h1>

            <form>
                <div className='form-group'>
                    <label htmlFor='name'>Nome </label>
                    <input type='text' value={name} onChange={onChange} className='form-control' id='name' placeholder='Nome do genêro' />
                </div>


                {nomeVazio == true &&
                    <div>{nomeVazioAlert}</div>
                }

                <button type='button' onClick={validar} className='btn btn-primary'>Salvar</button>
            </form>

        </div>
    )
}

export default NovoGenero