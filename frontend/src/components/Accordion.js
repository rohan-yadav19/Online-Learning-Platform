import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import './Accordion.css';

const Accordion = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="accordion">
      <button
        className="accordion-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <FiChevronDown className={`accordion-icon ${isOpen ? 'open' : ''}`} />
      </button>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};

export default Accordion;


