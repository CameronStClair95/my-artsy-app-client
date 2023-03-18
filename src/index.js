import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProviderWrapper } from './context/Theme.context';
import { AuthProviderWrapper } from './context/auth.context';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <ThemeProviderWrapper>
    <AuthProviderWrapper>
      <App />
    </AuthProviderWrapper>
    </ThemeProviderWrapper>
  </Router>
);

reportWebVitals();
