import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./components/style.css";
import MedicineManager from "./components/MedicineManager";

const App = () => {
  return (
    <Router>
      <div>
        {/* Navbar */}
        <nav className="navbar">
          <div className="navbar-logo">💊 Medicine Store</div>
          <ul className="navbar-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/medicines">Medicines</Link></li>
            {/* Later add -> Suppliers, Customers, Billing */}
          </ul>
        </nav>

        {/* Routes */}
        <div className="content">
          <Routes>
            <Route path="/" element={<h2>Welcome to Medicine Store Management System</h2>} />
            <Route path="/medicines" element={<MedicineManager/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
















































// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
