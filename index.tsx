<<<<<<< HEAD
import React from 'react';
=======
﻿import React from 'react';
>>>>>>> e8c9c57 (fix: correct component paths and index bootstrap)
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(rootElement);
<<<<<<< HEAD

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

=======

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
>>>>>>> e8c9c57 (fix: correct component paths and index bootstrap)
