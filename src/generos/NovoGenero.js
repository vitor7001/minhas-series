import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { InputGroup, InputGroupAddon, Alert, Container, Row, Col } from 'reactstrap'

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
            if (name.trim() === '') {
                throw new Error('')
            }
            setNomeVazio(false)
            save()
        } catch (error) {
            setNomeVazio(true)
        }
    }
    const [nomeVazio, setNomeVazio] = useState(false)
    const nomeVazioAlert =  (
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
                    <InputGroup>
                        <InputGroupAddon addonType='prepend'>Informe um existente</InputGroupAddon>
                        <input type='text' value={name} onChange={onChange}
                            className='form-control' id='name'
                            placeholder='Nome do genêro' />
                    </InputGroup>
                </div>

                {nomeVazio === true &&
                    <div>
                        <br />
                        {nomeVazioAlert}
                    </div>
                }
                <br />
                <button type='button' onClick={validar} className='btn btn-primary'>Salvar</button>
            </form>

        </div>
    )
}

export default NovoGenero