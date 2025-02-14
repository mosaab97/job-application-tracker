// src/routes/index.js
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ProtectedRoutes from './ProtectedRoutes';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import { JobsProvider } from '../context/JobsContext';


const AppRoutes = () => {

    return(
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoutes><JobsProvider><Dashboard/></JobsProvider></ProtectedRoutes>} />
      </Routes>
    </>
  );
}

export default AppRoutes;