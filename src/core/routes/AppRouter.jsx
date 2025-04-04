import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../../Auth/presentation/views/LoginView';
import HomeView from '../../home/presentation/views/HomeView';
import PrivateRoute from '../guards/PrivateRoute';
import DashboardView from '../../home/presentation/views/DashboardView';
import Header from '../../home/presentation/views/HeaderView';
import { useContext } from 'react';
import { AuthContext } from '../../core/context/AuthContext';
import RegisterView from '../../Register/presentation/views/RegisterView';
import AdminDashboard from '../../Administrador/prensentation/views/AdminDashboard';
import UserCagesView from '../../Cliente/presentation/view/UserCagesViews';
import { CageProvider } from '../context/CageContext';

function AppRouter() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      {/* Mostrar el Header solo si el usuario está autenticado */}
      

      {/* Envuelve las rutas con CageProvider */}
      <CageProvider>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<HomeView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterView />} />

          {/* Rutas protegidas */}
          <Route element={<PrivateRoute />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/usuario-dashboard" element={<UserCagesView/>} />
            <Route path="/dashboard/:idjaula" element={<DashboardView />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </CageProvider>
    </Router>
  );
}

export default AppRouter;