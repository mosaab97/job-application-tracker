import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'
import { loginApi } from '../services/auth';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      console.log(token)
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded.exp * 1000 < Date.now()) {
            logout();
          } else {
            setUser(decoded);
          }
        } catch (error) {
          console.error('Invalid token:', error);
          logout();
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (credentials) => {
    const response = await loginApi(credentials);
    localStorage.setItem('token', response.token);
    setUser(response.user);
    navigate('/dashboard'); // Redirect to dashboard
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ loading, setUser, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);