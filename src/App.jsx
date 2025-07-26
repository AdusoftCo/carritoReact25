// App.jsx

import React from 'react';
import Navegacion from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/home';
import Ofertas from './pages/Ofertas';
import Infaltables from './pages/Seguroksi';
import Contacto from './pages/Contacto';
import Carrito from './pages/Carrito';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Admin from './pages/Admin';
import { CartProvider } from './components/CartContext';
import { AuthProvider } from "./components/AuthContext";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import '@fortawesome/fontawesome-free/css/all.min.css';

const ConditionalNavbar = () => {
  const location = useLocation();
  const isDashboardRoute = location.pathname === '/dashboard';
  // If i have other admin-only routes where i do not want the main nav,
  // i can extend this:
  // const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/dashboard';

  return (
    !isDashboardRoute && <Navegacion />
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="wrapper">
            <ConditionalNavbar />
            <div className="main-content">
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/ofertas" element={<Ofertas/>} />
                <Route path="/seguroksi" element={<Infaltables/>} />
                <Route path="/contacto" element={<Contacto/>} />
                <Route path="/admin" element={<Admin/>} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="/carrito" element={<Carrito />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;