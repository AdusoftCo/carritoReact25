import React from 'react';
import Navegacion from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/home';
import Ofertas from './pages/Ofertas';
import Infaltables from './pages/Seguroksi';
import Contacto from './pages/Contacto';
import Carrito from './pages/Carrito';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './pages/Admin';
import { CartProvider } from './components/CartContext';
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  
  return (
    <CartProvider>
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
    </CartProvider>
  );
};

export default App;
