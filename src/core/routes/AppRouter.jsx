import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../../Auth/presentation/views/LoginView';
import HomeView from '../../home/presentation/views/HomeView';
import PrivateRoute from '../guards/PrivateRoute';
import DashboardView from '../../home/presentation/views/DashboardView';
import Header from '../../home/presentation/views/HeaderView';
import { useContext } from 'react';
import { AuthContext } from '../../core/context/AuthContext';

function AppRouter () {
  const { user } = useContext(AuthContext);  // Obtener el estado del usuario desde el contexto

  return (
    <Router>
      {user && <Header />} {/* Mostrar Header solo si el usuario está logueado */}
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardView />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
