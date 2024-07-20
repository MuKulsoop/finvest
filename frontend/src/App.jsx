import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
// import Navbar from './components/Navbar'
import Home from './pages/Home';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Dashboard } from './pages/Dashboard';
import ScrollToTop from './ScrollToTop';
import Loader from "./components/Loader";
import Projects from "./pages/Projects";


function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Duration of the loader animation

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="flex items-center flex-col bg-[#05140D]">
      <Router>
        <ScrollToTop />
        {loading ? (
          <Loader />
        ) : (
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/login' exact element={<Login />} />
            <Route path='/signup' exact element={<SignUp />} />
            <Route path='/dashboard' exact element={<Dashboard />} />
            <Route path='/projects' exact element={<Projects />} />
          </Routes>
        )}

      </Router>

    </div>
  )
}

export default App
