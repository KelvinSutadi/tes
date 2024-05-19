import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navigation';
import Home from './components/pages/Home';
import AboutUs from './components/AboutUs';
import Carousel from './components/Carousel';
import Auth from './components/Auth';
import Contact from './components/Contact';
import FavouritePlaces from './components/FavouritePlaces'; // Corrected import statement
import './styles.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/wisata" element={<Carousel />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/favourite-places" element={<FavouritePlaces />} /> {/* Corrected FavouritePlaces route */}
      </Routes>
      <footer className="footer">
        <p>&copy; 2024 Your Website Name. All rights reserved.</p>
      </footer>
    </Router>
  );
}

export default App;

