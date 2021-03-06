import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Badge } from 'reactstrap'

function InfoSerie({ match }) {
    const [form, setForm] = useState({
        name: ''
    })
    const [sucess, setSucess] = useState(false)
    const [mode, setMode] = useState('INFO')
    const [genres, setGenres] = useState([])
    const [genreId, setGenreId] = useState('')

    const styleBadge = {
        fontSize: 17,
        display: 'block',
        width: '200px'
    }

    const [data, setData] = useState({})
    useEffect(() => {
        axios.get('/api/series/' + match.params.id)
            .then(res => {
                setData(res.data)
                setForm(res.data)
            })

    }, [match.params.id])

    useEffect(() => {
        axios
            .get('/api/genres')
            .then(res => {
                setGenres(res.data.data)

                const genres = res.data.data
                const encontrado = genres.find(value => data.genre === value.name)

                if (encontrado) {
                    setGenreId(encontrado.id)
                }
            })
    }, [data])

    // custom header
    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }

    const onChangeGenre = evt => {
        setGenreId(evt.target.value)
    }

    const onChange = field => evt => {
        setForm({
            ...form,
            [field]: evt.target.value
        })
    }

    const seleciona = value => () => {
        setForm({
            ...form,
            status: value
        })
    }


    const save = () => {
        axios.put('/api/series/' + match.params.id, {
            ...form,
            genre_id: genreId
        })
            .then(resp => {
                setSucess(true)
            })
    }


    if (sucess) {
        return <Redirect to='/series' />
    }

    return (
        <div>

            <header style={masterHeader}>

                <div className='h-100' style={{ background: 'rgba(0,0,0,0.7)' }}>
                    <div className='h-100 container'>
                        <div className='row h-100 align-items-center'>
                            <div className='col-3'>
                                <img alt={data.name} className='img-fluid img-thumbnail' src={data.poster} />
                            </div>
                            <div className='col-9'>
                                <h1 className='font-weight-light text-white'>
                                    {data.name}
                                </h1>
                                <div className='lead text-white'>
                                    {data.status === 'ASSISTIDO' && <Badge color='success' style={styleBadge}> Assistido! </Badge>}
                                    {data.status === 'PARA_ASSISTIR' && <Badge color='warning' style={styleBadge}> Para Assistir! </Badge>}
                                    {
                                        data.genre !== null &&
                                        <Badge color='info' style={{ fontSize: 17, width: '200px' }}>
                                            Genêro:  {data.genre}
                                        </Badge>
                                    }
                                    {
                                        data.genre === null &&
                                        <Badge color='danger' style={{ fontSize: 17, width: '200px' }}>
                                            SEM GENÊRO :/
                                    </Badge>
                                    }
                                </div>


                            </div>
                        </div>
                    </div>
                </div>

            </header>



            {
                mode === 'INFO' &&
                <div className='container'>
                    <h1 align='center'>Editar Série</h1>
                    <button className='btn btn-primary' onClick={() => setMode('EDIT')
                    }>
                        Editar
                </button>
                </div>
            }

            {

                mode === 'EDIT' &&


                <div className='container'>
                    <h1 align='center'>Editar Série</h1>
                    <button className='btn btn-danger' onClick={() => setMode('INFO')}>
                        Cancelar Edição
                    </button>
                    <form>
                        <div className='form-group'>
                            <label htmlFor='name'>Nome </label>
                            <input type='text' value={form.name} onChange={onChange('name')} className='form-control' id='name' placeholder='Nome da série' />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='name'>Comentários </label>
                            <input type='text' value={form.comments} onChange={onChange('comments')} className='form-control' id='name' placeholder='Comentários sobre o que achou sobre a série' />
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
                                type='radio' checked={form.status === 'ASSISTIDO'} name='status' id='assistido' value='ASSISTIDO' />
                            <label className='form-check-label' htmlFor='assistido'>
                                Assistido
                        </label>
                        </div>

                        <div className='form-check'>
                            <input onChange={seleciona('PARA_ASSISTIR')} className='form-check-input'
                                type='radio' checked={form.status === 'PARA_ASSISTIR'} name='status' id='paraAssistir' value='PARA_ASSISTIR' />
                            <label className='form-check-label' htmlFor='paraAssistir'>
                                Para Assistir
                        </label>
                        </div>



                        <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>
                    </form>

                </div>
            }
        </div>
    )
}

export default InfoSerie
