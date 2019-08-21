import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

function EditarGenero ({match}) {
const [name, setName] = useState('')
const [sucess, setSucess] = useState(false)
const [nomeAtual, setNomeAtual] = useState('')
useEffect(()   => {
    axios
        .get('/api/genres/' + match.params.id)
        .then(resp =>{
            setNomeAtual(resp.data.name)
        })
}, [ match.params.id])


const onChange = evt =>{
    setName(evt.target.value)
}

const save = () =>{
        axios.put('/api/genres/' +  match.params.id , {
            name
        })
        .then(resp => {
            setSucess(true)
        })
}

if (sucess)
    return <Redirect to='/generos' />

    return(
        <div className='container'>
            <h1>Editar Genêro  {nomeAtual}</h1>

                <form>
                    <div className='form-group'>
                        <label htmlfor='name'>Nome </label>
                        <input type='text' value={name} onChange={onChange} 
                        className='form-control' id='name'  placeholder={`Novo nome para o genêro ${nomeAtual}`} />
                    </div>
                    <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>
                </form>

        </div>
    )
}

export default  EditarGenero
