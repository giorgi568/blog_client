import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.tsx'
import './index.css';
import Router from './Router';
console.log('heyy')
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
