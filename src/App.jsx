import React from 'react';
import Navegacion from './components/NavBar';
import Home from './pages/home';
import Ofertas from './pages/Ofertas';
import Infaltables from './pages/Seguroksi';
import Contacto from './pages/Contacto';
import Carrito from './pages/Carrito';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './pages/Admin';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from './components/Footer';

function App() {
  
  return (
    
      <Router>
        <div className="wrapper">
          <Navegacion />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/ofertas" element={<Ofertas/>} />
              <Route path="/seguroksi" element={<Infaltables/>} />
              <Route path="/contacto" element={<Contacto/>} />
              <Route path="/admin" element={<Admin/>} />
              <Route path="/carrito" element={<Carrito/>} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    
  );
};

export default App;
