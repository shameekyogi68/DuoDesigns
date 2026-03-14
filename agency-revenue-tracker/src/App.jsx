import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '@/constants/app';
import AppLayout from '@/components/layout/AppLayout';
import ProtectedRoute from '@/components/layout/ProtectedRoute';

// Pages
import Dashboard from '@/pages/Dashboard';
import Orders from '@/pages/Orders';
import Monthly from '@/pages/Monthly';
import Reports from '@/pages/Reports';
import Settings from '@/pages/Settings';
import Login from '@/pages/Login';

function App() {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.ORDERS} element={<Orders />} />
          <Route path={ROUTES.SETTLEMENTS} element={<Monthly />} />
          <Route path={ROUTES.REPORTS} element={<Reports />} />
          <Route path={ROUTES.SETTINGS} element={<Settings />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
    </Routes>
  );
}

export default App;
