import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from "./store/store.js";
import './index.css';
import App from './App.jsx';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>
);
