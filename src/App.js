import React from 'react';
import Header from './Header';
import Generos from './generos/Generos';
import NovoGenero from './generos/NovoGenero';
import EditarGenero from './generos/EditarGenero';
import Series from './series/Series';
import NovaSerie from './series/NovaSerie';
import InfoSerie from './series/InfoSerie';

//{/*, Container, Button */}Para o Jumbotron
import { Jumbotron} from 'reactstrap';

import {
  BrowserRouter as Router,
  Route,
  Switch
}  from 'react-router-dom';

const Home = () =>{
  return (

    <div>
      <Jumbotron>
        <h1 className="display-3">Minhas Series!</h1>
        <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
        <hr className="my-2" />
        <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
        {/*<p className="lead">
          <Button color="primary">Learn More</Button>
  </p>*/}
      </Jumbotron>
    </div>

  )
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
