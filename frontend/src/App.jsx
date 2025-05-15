import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import MedicamentoList from './pages/MedicamentoList';
import MedicamentoForm from './pages/MedicamentoForm';
import LaboratorioList from './pages/LaboratorioList';
import LaboratorioForm from './pages/LaboratorioForm';
import TipoMedicamentoList from './pages/TipoMedicamentoList';
import EspecialidadList from './pages/EspecialidadList';
import OrdenCompraList from './pages/OrdenCompraList';
import OrdenCompraForm from './pages/OrdenCompraForm';
import UserList from './pages/UserList';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<Home />} />

        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas básicas */}
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />

        {/* Rutas de Medicamentos */}
        <Route path="/medicamentos" element={
          <PrivateRoute>
            <MedicamentoList />
          </PrivateRoute>
        } />
        <Route path="/medicamentos/gestionar" element={
          <PrivateRoute roles={["ROLE_ADMIN", "ROLE_MODERATOR"]}>
            <MedicamentoForm />
          </PrivateRoute>
        } />
        <Route path="/medicamentos/gestionar/:id" element={
          <PrivateRoute roles={["ROLE_ADMIN", "ROLE_MODERATOR"]}>
            <MedicamentoForm />
          </PrivateRoute>
        } />

        {/* Rutas de Laboratorios */}
        <Route path="/laboratorios" element={
          <PrivateRoute roles={["ROLE_ADMIN"]}>
            <LaboratorioList />
          </PrivateRoute>
        } />
        <Route path="/laboratorios/crear" element={
          <PrivateRoute roles={["ROLE_ADMIN"]}>
            <LaboratorioForm />
          </PrivateRoute>
        } />
        <Route path="/laboratorios/editar/:id" element={
          <PrivateRoute roles={["ROLE_ADMIN"]}>
            <LaboratorioForm />
          </PrivateRoute>
        } />

        {/* Rutas de Tipos de Medicamentos */}
        <Route path="/tipos-medicamentos" element={
          <PrivateRoute roles={["ROLE_ADMIN"]}>
            <TipoMedicamentoList />
          </PrivateRoute>
        } />

        {/* Rutas de Especialidades */}
        <Route path="/especialidades" element={
          <PrivateRoute roles={["ROLE_ADMIN"]}>
            <EspecialidadList />
          </PrivateRoute>
        } />

        {/* Rutas de Órdenes */}
        <Route path="/ordenes" element={
          <PrivateRoute roles={["ROLE_ADMIN", "ROLE_MODERATOR"]}>
            <OrdenCompraList />
          </PrivateRoute>
        } />
        <Route path="/ordenes/crear" element={
          <PrivateRoute roles={["ROLE_ADMIN", "ROLE_MODERATOR"]}>
            <OrdenCompraForm />
          </PrivateRoute>
        } />

        {/* Rutas de Administración */}
        <Route path="/admin" element={
          <PrivateRoute roles={["ROLE_ADMIN"]}>
            <AdminDashboard />
          </PrivateRoute>
        } />
        <Route path="/usuarios" element={
          <PrivateRoute roles={["ROLE_ADMIN"]}>
            <UserList />
          </PrivateRoute>
        } />

        {/* Ruta 404 */}
        <Route path="*" element={
          <div className="container mt-4">
            <h2>Página no encontrada</h2>
            <p>La ruta especificada no existe.</p>
          </div>
        } />
      </Routes>
    </>
  );
}