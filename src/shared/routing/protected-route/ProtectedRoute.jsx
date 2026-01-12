import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../../app/providers/AuthProvider';

export const ProtectedRoute = () => {
    const { isAdmin } = useAuth();

    return isAdmin ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

