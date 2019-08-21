import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';

function Series() {
    const [data, setData] = useState([])
  
    useEffect(() => {
      axios.get('/api/series')
      .then(res => {
        setData(res.data.data)
      })
    }, [])

const deleteSerie = id =>{
    axios.delete('/api/series/' + id)
    .then(resp => {
        const filtrado = data.filter(item => item.id !== id)
        setData(filtrado)
    })
}
    
    const renderizaLinha = record =>{
        return(
        <tr key={record.id} align='center'>
            <th scope='row'>{record.id}</th>
                <td>{record.name}</td>
                <td>
                    <Link className='btn btn-primary' to={'/series/' + record.id}>Info</Link>
                    <button className='btn btn-danger' onClick={() => deleteSerie(record.id)}> Remover </button>
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
        <p>Aqui temos todos as séries já cadastradas</p> 
    </Alert>
)
    
const alertaNenhum = (
    <Alert color="warning" isOpen={visible} toggle={onDismiss}>
        <p>Seja o primeiro a cadastrar uma série!</p> 
    </Alert>
)


if(data.length === 0 ){
    return(
        <div className='container'>
            <h1>Séries</h1>
            <div>{alertaNenhum}</div>
            <div className='alert  alert-danger' role='alert'>
                    Você não possui Séries criadas!
            </div>
            <Link to='/series/novo'  className='btn btn-danger'> Nova Série URGENTE! </Link>
        </div>
    )
}

    return (
        <div className='container'>
                <h1 align='center'> Séries </h1>
                <div>{alerta}</div>
                <Link to='/series/novo'  className='btn btn-primary'> Nova Série </Link>
                <table className='table  table-dark'>
                    <thead>
                        <tr align='center'>
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

  export default Series;