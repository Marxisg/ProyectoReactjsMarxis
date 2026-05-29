import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import { App } from './App.jsx'
import { ProveedorCarrito } from './providers/ContextoCarrito.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ProveedorCarrito>
      <App />
      </ProveedorCarrito>
    </BrowserRouter>
  </StrictMode>,
)