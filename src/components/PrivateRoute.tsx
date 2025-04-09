// src/components/PrivateRoute.tsx
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
  redirectTo?: string;
}

const PrivateRoute = ({ redirectTo = '/login' }: PrivateRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return <div className="loading-container flex justify-center items-center h-screen">Loading...</div>;
  }

  // Redirect to login if not authenticated
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default PrivateRoute;