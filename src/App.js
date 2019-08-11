import React from 'react';
import Header from './Header';
import Generos from './generos/Generos';
import NovoGenero from './generos/NovoGenero';
import EditarGenero from './generos/EditarGenero';
import Series from './series/Series';
import NovaSerie from './series/NovaSerie';
import InfoSerie from './series/InfoSerie';

import {
  BrowserRouter as Router,
  Route,
  Switch
}  from 'react-router-dom';

const Home = () =>{
  return <h1> Home </h1>
}

function App() {


  return (
  <Router>
    <div>
       <Header />
       <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/generos' exact component={Generos} />
          <Route path='/generos/novo' exact component={NovoGenero} />
          <Route path='/generos/:id' exact component={EditarGenero} />
          <Route path='/series' exact component={Series} />
          <Route path='/series/novo' exact component={NovaSerie} />
          <Route path='/series/:id' exact component={InfoSerie} />

       </Switch>
    </div>
  </Router>
  );
}

export default App;
