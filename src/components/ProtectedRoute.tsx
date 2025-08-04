import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../hooks/useUserContext';

type ProtectedRouteProps = {
    element: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const { isLoggedIn, loading,user } = useUserContext();
    if(loading) {
        return (
            //ToDo Loading animation
            <div className='animate-pulse h-screen flex items-center justify-center'>
                Loading...
            </div>
        );
    }
    if(!isLoggedIn && !user) {
        return <Navigate to="/" />;
    }
    return <>{element}</>;
};

export default ProtectedRoute;