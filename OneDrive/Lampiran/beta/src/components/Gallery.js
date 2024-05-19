import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from './Modal';
import "./Gallery.css";
import API_URLS from "../config/api.js";


const Gallery = () => {
  const [projects, setProjects] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch`${API_URLS}s"sith)
 }
      .then((response) => response.json())
      .then((data) => {
        setProjects(data.map((item) => ({
          id: item.id,
          imageSrc: item.imageUrl,
          title: item.name,
          category: item.category,
          description: item.description || item.category,
        })));
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleLearnMore = (index) => {
    navigate("/carousel", { state: { slideIndex: index } });
  };

  const handleToggleFavorite = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleConfirmFavorite = () => {
    if (selectedProject) {
      fetch('https://jakarta-api.netlify.app/.netlify/functions/app/favourites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedProject),
      })
        .then(response => response.json())
        .then(data => {
          toast.success(`${selectedProject.title} added to favorites!`);
          setShowModal(false);
        })
        .catch(error => {
          console.error('Error adding to favorites:', error);
          toast.error(`Failed to add ${selectedProject.title} to favorites.`);
          setShowModal(false);
        });
    }
  };

  return (
    <div className="batas">
      <Link to="/favourites" className="myFavouritesButton">My Favourites</Link>
      <section id="portfolio">
        {projects.map((project, index) => (
          <div
            key={index}
            className="project"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            >
            <div style={{position: 'absolute', width: '100%', height: '100%', zIndex: 1, background: 'black', opacity: '0.3'}}></div>
            <img src={project.imageSrc} alt={project.title} />
            <p>{project.category}</p>
            <h3 className="grid__title">{project.title}</h3>
            <div className="grid__overlay">
              <button className="learnMoreButton" onClick={() => handleLearnMore(index)}>
                Learn More
              </button>
              {hoveredIndex === index && (
                <button className="favoriteButton" onClick={() => handleToggleFavorite(project)}>
                  <i className="fa fa-heart"></i>
                </button>
              )}
            </div>
          </div>
        ))}
      </section>
      <Modal
        show={showModal}
        title={`Add ${selectedProject?.title} to favorites?`}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmFavorite}
      />
      <ToastContainer />
    </div>
  );
};

export default Gallery;

