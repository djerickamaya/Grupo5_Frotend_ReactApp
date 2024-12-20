import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({children}) => {
    const isAuthenticated = !!localStorage.getItem('token'); // Verifica si hay un token
    return isAuthenticated ? children : <Navigate to="/login" replace />;
}
