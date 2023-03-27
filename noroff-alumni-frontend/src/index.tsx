import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Provider} from "react-redux";
import store from "./store/store";
import App from './App';
import AlertTemplate from "./components/alert/Alert";
import { transitions, positions, Provider as AlertProvider } from 'react-alert';

const options = {
    position: positions.TOP_CENTER,
    timeout: 3000,
    transition: transitions.SCALE
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...options}>
            <App />
        </AlertProvider>
    </Provider>
  </React.StrictMode>
);
