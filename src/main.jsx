import ReactDOM from 'react-dom/client';
import Modal from 'react-modal';

import App from './app/App.jsx';

import './styles/index.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-calendar-heatmap/dist/styles.css';

// noinspection JSUnresolvedReference
Modal.setAppElement('#app');

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
