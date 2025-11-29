import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ progress, showLabel = true }) => {
  return (
    <div className="progress-bar-container">
      {showLabel && (
        <div className="progress-bar-label">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
      )}
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;


