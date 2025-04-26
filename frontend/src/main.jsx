import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';  // Import BrowserRouter
import './index.css';
import App from './App.jsx';
import ManagerPage from './pages/managerPage.jsx';
import VictimPage from './pages/victimPage.jsx';
import VolunteerPage from './pages/volunteerPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>  
      <Routes> 
        <Route path="/" element={<App />} />
        <Route path = "/manager" element={<ManagerPage />}/>
        <Route path = "/victim" element={<VictimPage />}/>
        <Route path = "/volunteer" element={<VolunteerPage />}/>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
