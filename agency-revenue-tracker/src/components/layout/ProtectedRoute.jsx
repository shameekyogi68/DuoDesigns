import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { ROUTES } from '@/constants/app';

const ProtectedRoute = () => {
  const { isLoggedIn, checkSession } = useAuthStore();

  const isValid = checkSession();

  if (!isLoggedIn || !isValid) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
