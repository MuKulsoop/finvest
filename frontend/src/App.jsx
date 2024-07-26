import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Dashboard } from './pages/Dashboard';
import ScrollToTop from './ScrollToTop';
import Loader from "./components/Loader";
import Projects from "./pages/Projects";
import PostProject from "./pages/PostProject";
import ProjectDetailedView from "./components/ProjectDetailedView";
import { Setting } from "./pages/Setting";
import MilestoneDetailedView from "./components/MileStonesDetailedView";
import Service from "./pages/Posts";

function App() {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('./projects.json')
      .then(response => response.json())
      .then(data => setProjectsData(data))
      .catch(error => console.error('Error fetching data:', error))
      // .finally(() => setLoading(false));
      const timer = setTimeout(() => {
        setLoading(false);
      }, 3000); // Duration of the loader animation
  
      return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center flex-col bg-[#05140D] overflow-x-hidden">
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
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId" element={<ProjectDetailedView projects={projectsData} />} />
            <Route path="/projects/:projectId/milestones" element={<MilestoneDetailedView />} />
            <Route path="/projects/post-project" element={<PostProject />} />
            <Route path="/posts" element={<Service />} />

            <Route path="settings" element={<Setting />} />

          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
