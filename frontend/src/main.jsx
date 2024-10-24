import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { ContextProvider } from './Config/contexts/context';

import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ContextProvider>
    <Router basename='/'>
      <App />
    </Router>
  </ContextProvider>
);
