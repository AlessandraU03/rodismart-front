import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './core/context/AuthContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
