import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

//create a 'root' element in the html document 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //render the 'app' coponent within a strict mode
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


