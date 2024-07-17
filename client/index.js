import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Create a root using createRoot
const root = document.querySelector('#root');
const rootRender = ReactDOM.createRoot(root);
rootRender.render(rootElement);


// import React from 'react';
// import ReactDOM from 'react-dom';

// import App from './App';

// ReactDOM.render(<App />, document.getElementById('root'));
