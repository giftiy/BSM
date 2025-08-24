// /src/routes/ProtectedRoute.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';


const ProtectedRoute = ({ allowedRoles }) => {
  console.log(`Development Mode: Allowing access for roles:`, allowedRoles);
  return <Outlet />; 
};


export default ProtectedRoute;