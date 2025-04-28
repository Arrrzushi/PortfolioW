import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import Background3D from './components/Background3D';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import About from './pages/About';
import Contact from './pages/Contact';
import Education from './pages/Education';
import ImageViewer from './components/ImageViewer';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="App">
        <CustomCursor />
        <Background3D />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/education" element={<Education />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/view/:id" element={<ImageViewer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
