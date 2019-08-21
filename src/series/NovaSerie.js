import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { InputGroup, InputGroupAddon, InputGroupText, Alert, Container, Row, Col } from 'reactstrap'

function NovaSerie() {
    const [name, setName] = useState('')
    const [comments, setComments] = useState('')
    const [sucess, setSucess] = useState(false)
    const [status, setStatus] = useState('')

    const [genres, setGenres] = useState([])
    const [genreId, setGenreId] = useState('')

    const [nomeVazio, setNomeVazio] = useState(false)


    useEffect(() => {
        axios
            .get('/api/genres')
            .then(res => {
                setGenres(res.data.data)
            })
    }, [genres])



    const onChangeGenre = evt => {
        setGenreId(evt.target.value)
    }

    const onChangeComments = evt => {
        setComments(evt.target.value)
    }

    const onChangeName = evt => {
        setName(evt.target.value)
    }

    const save = () => {
        axios.post('/api/series', {
            name,
            comments,
            status,
            genre_id: genreId
        })
            .then(resp => {
                setSucess(true)
            })
    }

    const seleciona = value => () => setStatus(value)


    const validar = () => {
        try {
            //validação para verificar se o campo não está vazio ou com espaços
            if (name.trim() == '') {
                throw new Error('')
            }
            setNomeVazio(false)
            save()
        } catch (error) {
            setNomeVazio(true)
        }
    }

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


    if (sucess) {
        return <Redirect to='/series' />
    }
    return (
        <div className='container'>
            <h1>Nova Série</h1>

            <form>
                <div className='form-group'>
                    <label htmlFor='name'>Nome </label>

                    <InputGroup>
                        <InputGroupAddon addonType='prepend'>Use o original ;)</InputGroupAddon>
                        <input type='text' value={name} onChange={onChangeName}
                            className='form-control' id='name' placeholder='Nome da série' />
                    </InputGroup>

                    {nomeVazio == true &&
                        <div>
                            <br />
                            {nomeVazioAlert}
                        </div>
                    }

                </div>

                <div className='form-group'>
                    <label htmlFor='comments'>Comentários </label>

                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>Me incentive!</InputGroupText>
                        </InputGroupAddon>
                        <input type='text' value={comments} onChange={onChangeComments} className='form-control' id='name' placeholder='Comentários sobre ela' />

                    </InputGroup>


                </div>




                <div className='form-group'>
                    <label htmlFor='name'>Genêro </label>
                    <select className='form-control' onChange={onChangeGenre} value={genreId}>
                        <option>-</option>
                        {genres.map(genre => <option key={genre.id}
                            value={genre.id}>{genre.name}</option>)}
                    </select>
                </div>

                <div className='form-check'>
                    <input onChange={seleciona('ASSISTIDO')} className='form-check-input'
                        type='radio' name='status' id='assistido' value='ASSISTIDO' />
                    <label className='form-check-label' htmlFor='assistido'>
                        Assistido
                        </label>
                </div>

                <div className='form-check'>
                    <input onChange={seleciona('PARA_ASSISTIR')} className='form-check-input'
                        type='radio' name='status' id='paraAssistir' value='PARA_ASSISTIR' />
                    <label className='form-check-label' htmlFor='paraAssistir'>
                        Para Assistir
                        </label>
                </div>

                <br />
                <button type='button' onClick={validar} className='btn btn-primary'>Salvar</button>
            </form>

        </div>
    )
}

export default NovaSerie
