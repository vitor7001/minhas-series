import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

const NovaSerie = () => {
const [name, setName] = useState('')
const [comments, setComments] = useState('')
const [sucess, setSucess] = useState(false)


const [genres, setGenres] = useState([])
const [genreId, setGenreId] = useState('')


useEffect(() =>{
    axios
        .get('/api/genres')
        .then(res => {
            setGenres(res.data.data)
        })
}, [genres])



const onChangeGenre = evt =>{
    setGenreId(evt.target.value)
}

const onChangeComments = evt =>{
    setComments(evt.target.value)
}

const onChangeName = evt =>{
    setName(evt.target.value)
}

const save = () =>{
        axios.post('/api/series', {
            name,
            comments,
            genre_id: genreId
        })
        .then(resp => {
            setSucess(true)
        })
}

if (sucess){
    return <Redirect to='/series' />
}
    return(
        <div className='container'>
            <h1>Nova Série</h1>

                <form>
                    <div className='form-group'>
                        <label htmlFor='name'>Nome </label>

                        <InputGroup>
                            <InputGroupAddon addonType='prepend'>Use o original ;)</InputGroupAddon>
                            <input type='text' value={name} onChange={onChangeName} 
                            className='form-control' id='name'  placeholder='Nome da série' />
                        </InputGroup>
                        
                    </div>

                    <div className='form-group'>
                        <label htmlFor='comments'>Comentários </label>

                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>Me incentive!</InputGroupText>
                            </InputGroupAddon>
                            <input type='text' value={comments} onChange={onChangeComments} className='form-control' id='name'  placeholder='Comentários sobre ela' />

                        </InputGroup>


                    </div>




                    <div className='form-group'>
                        <label htmlFor='name'>Genêro </label>
                        <select className='form-control' onChange={onChangeGenre} value={genreId}>
                        <option>-</option>
                           {genres.map(genre =>  <option key={genre.id}
                           value={genre.id}>{genre.name}</option>)}
                        </select>
                    </div>


                    <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>
                </form>

        </div>
    )
}

export default  NovaSerie;