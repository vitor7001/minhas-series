import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';

const Generos = () =>{
    const [data, setData] = useState([])
  
    useEffect(() => {
      axios.get('/api/genres')
      .then(res => {
       setData(res.data.data)
      })
    }, [])

const deleteGenero = id =>{
    axios.delete('/api/genres/' + id)
    .then(resp => {
        const filtrado = data.filter(item => item.id !== id)
        setData(filtrado)
    })
}
    
const renderizaLinha = record =>{
        return(
        <tr key={record.id}>
            <th scope='row'>{record.id}</th>
                <td>{record.name}</td>
                <td>
                    <Link className='btn btn-info' to={'/generos/' + record.id}>Editar</Link>
                    <button className='btn btn-danger' onClick={() => deleteGenero(record.id)}> Remover </button>
                </td>
        </tr>
        )
}

const [visible, setVisible] = useState(true)

const onDismiss = () =>{
    setVisible(false)
}

const alerta = (
    <Alert color="info" isOpen={visible} toggle={onDismiss}>
       <p>Aqui temos todos os genêros já cadastrados</p> 
    </Alert>
    )

 const alertaNenhum = (
    <Alert color="warning" isOpen={visible} toggle={onDismiss}>
        <p>Seja o primeiro a cadastrar um genêro!</p> 
    </Alert>
 )


if(data.length === 0 ){
    return(
        <div className='container'>
            <h1>Genêros</h1>
            <div>{alertaNenhum}</div>
            <div className='alert  alert-danger' role='alert'>
                    Não possuimos Genêros cadastrados!
            </div>
            <Link to='/generos/novo'  className='btn btn-danger'> Novo Genêro URGENTE! </Link>
        </div>
)}
    return (
        <div className='container'>
            
                <h1> Genêros </h1>
                <div>{alerta}</div>
                <Link to='/generos/novo'  className='btn btn-primary'> Novo Genêro </Link>
                <table className='table  table-dark'>
                    <thead>
                        <tr>
                            <th scope='col'>Id</th>
                            <th scope='col'>Nome</th>
                            <th scope='col'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>

                            {data.map(renderizaLinha)}

                    </tbody>
                </table>
        </div>
    )
  }

  export default Generos;