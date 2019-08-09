import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import {Badge} from 'reactstrap';

const InfoSerie = ({match}) => {
const [form, setForm] = useState({})
const [sucess, setSucess] = useState(false)
const [mode,setMode] = useState('INFO')

const [data,  setData] = useState({})
useEffect(() =>{
    axios.get('/api/series/' + match.params.id)
    .then(res => {
        setData(res.data)
        setForm(res.data)
    })
}, [match.params.id])


// custom header
const masterHeader ={
    height: '50vh',
    minHeight: '500px',
    backgroundImage : `url('${data.background}')`,
    backgroundSize :'cover',
    backgroundPosition:'center',
    backgroundRepeat:'no-repeat'
}

const onChange = field => evt =>{
    setForm({
        ...form,
        [field] : evt.target.value
    })
}

const save = () =>{
        axios.post('/api/series', {
            form
        })
        .then(resp => {
            setSucess(true)
        })
}

if (sucess){
    return <Redirect to='/series' />
}

    return(
        <div>

            <header style={masterHeader}>

                <div className='h-100' style={{background : 'rgba(0,0,0,0.7)'}}>
                    <div className='h-100 container'>
                        <div className='row h-100 align-items-center'>
                            <div className='col-3'>
                                <img alt={data.name} className='img-fluid img-thumbnail' src={data.poster}/>
                            </div>
                            <div className='col-9'>
                                <h1 className='font-weight-light text-white'>
                                {data.name}
                                </h1>
                                <div className='lead text-white'>
                                <Badge color='success'> Assistido </Badge>
                                <Badge color='warning'> Para Assistir </Badge>
                                Genêro: {data.genre}
                                </div>

                            
                            </div>
                        </div>
                    </div>
                </div>

            </header>

            <div>
                <button className='btn btn-primary' onClick={() => setMode('EDIT')}>
                    Editar
                </button>
            </div>

        {
            
        mode === 'EDIT' &&  
            <div className='container'>
                <h1>Nova Série</h1>
                <prev>{JSON.stringify(form)}</prev>
                <button className='btn btn-primary' onClick={() => setMode('INFO')}>
                    Cancelar Edição
                </button>
                <form>
                    <div className='form-group'>
                        <label htmlfor='name'>Nome </label>
                        <input type='text' value={form.name} onChange={onChange('name')} className='form-control' id='name'  placeholder='Nome da série' />
                    </div>

                    <div className='form-group'>
                        <label htmlfor='name'>Comentários </label>
                        <input type='text' value={form.comments} onChange={onChange('comments')} className='form-control' id='name'  placeholder='Nome da série' />
                    </div>
                <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>
                </form>

            </div>
        }
        </div>
    )
}

export default  InfoSerie;
