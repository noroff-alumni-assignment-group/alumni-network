import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AlertTemplate from "./components/alert/Alert";
import { transitions, positions, Provider as AlertProvider } from 'react-alert';

const options = {
    position: positions.TOP_CENTER,
    timeout: 5000,
    transition: transitions.SCALE
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <AlertProvider template={AlertTemplate} {...options}>
          <App />
      </AlertProvider>
  </React.StrictMode>
);

