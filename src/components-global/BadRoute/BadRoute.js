import React from 'react';
import { Link } from 'react-router-dom';

const BadRoute = () => (
  <div>
    <div>Página não encontrada</div>
    <Link to="/explorar/bebidas"><button>Voltar</button></Link>
  </div>
);

export default BadRoute;
