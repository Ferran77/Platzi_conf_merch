import React from 'react';
import ReactDOM from 'react-dom';

import App from './routes/App';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
