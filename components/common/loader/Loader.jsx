import React from 'react';
// import './Loader.scss'; // or './Loader.css'

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-spinner"></div>
      <div className="loader-text">Loading...</div>
    </div>
  );
};

export default Loader;