// src/App.jsx
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppRoutes /> {/* Chat will now be inside CustomerDashboard only */}
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
