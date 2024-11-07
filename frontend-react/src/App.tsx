import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

// Importando os componentes de página
import ListaProdutos from './pages/ListaProdutos';
import NaoEncontrado from './pages/NaoEncontrado';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListaProdutos />} />
        <Route path="*" element={<NaoEncontrado />} />  {/* Página de erro para rotas não definidas */}
      </Routes>
    </Router>
  );
}

export default App;