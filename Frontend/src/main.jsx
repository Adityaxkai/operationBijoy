// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ProgramProvider } from './context/ProgramContext'; // <-- Import the context provider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProgramProvider> {/* ✅ Wrap App in the provider */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ProgramProvider>
  </React.StrictMode>,
);
