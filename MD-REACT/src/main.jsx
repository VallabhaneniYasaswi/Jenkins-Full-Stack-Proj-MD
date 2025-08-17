import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
// import MedicineManager from './components/MedicineManager.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <MedicineManager/> */}
  </StrictMode>,
)
