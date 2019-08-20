import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

function NovoGenero () {
const [name, setName] = useState('')
const [sucess, setSucess] = useState(false)
const onChange = evt =>{
    setName(evt.target.value)
}

const save = () =>{
        axios.post('/api/genres', {
            name
        })
        .then(resp => {
            setSucess(true)
        })
}


const validar = () =>{

    try {
        //validação para verificar se o campo não está vazio ou com espaços
        if(name.trim() == ''){
            throw new Error("Nome do genêro não pode estar vazio!");
        }

        save();

    } catch (error) {
        window.alert(error);
    }

}


if (sucess)
    return <Redirect to='/generos' />

    return(
        <div className='container'>
            <h1>Novo Genêro</h1>

                <form>
                    <div className='form-group'>
                        <label htmlFor='name'>Nome </label>
                        <input type='text' value={name} onChange={onChange} className='form-control' id='name'  placeholder='Nome do genêro' />
                    </div>
                    <button type='button' onClick={validar} className='btn btn-primary'>Salvar</button>
                </form>

        </div>
    )
}

export default  NovoGenero;