import React from 'react';
import ReactDOM from 'react-dom/client';
import TodosContextProvider from './store/todos-context';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TodosContextProvider>
       <App />
    </TodosContextProvider>
  </React.StrictMode>
)
