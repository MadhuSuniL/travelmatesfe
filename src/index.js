import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import TripFilterStore from './redux/Trips/TripFilterStore';
import { PrimeReactProvider } from 'primereact/api';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={TripFilterStore}>
      <PrimeReactProvider>
            <App />
      </PrimeReactProvider>
      </Provider>
  </React.StrictMode>
);

