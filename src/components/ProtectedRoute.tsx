import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../hooks/useUserContext';

type ProtectedRouteProps = {
    element: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const { isLoggedIn } = useUserContext();
    if(!isLoggedIn) {
        return <Navigate to="/" />;
    }
    return <>{element}</>;
};

export default ProtectedRoute;