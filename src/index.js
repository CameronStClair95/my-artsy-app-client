import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProviderWrapper } from './context/Auth.context';
import { ThemeProviderWrapper } from './context/Theme.context';


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
