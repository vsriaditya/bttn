import React, { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";

const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
  const checkAuthentication = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const response = await fetch('http://127.0.0.1:8000/api/check-authentication', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } else {
        setAuthenticated(false);
      }
    } catch (error) {
      setAuthenticated(false);
    }

    setLoading(false);
  };

    useEffect(() => {
      checkAuthentication();
    }, []);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (authenticated) {
      return <Component {...props} />;
    } else {
      return <Navigate to="/login" replace />
    }
  };

  return AuthenticatedComponent;
};

export default withAuth;
