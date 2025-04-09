

import React from 'react';
import { MdSchool, MdGroup, MdConnectWithoutContact } from 'react-icons/md';

const About: React.FC = () => {
  return (
    <div className="container">
      <div className="about-content">
        <h1>About </h1>
        <div className="about-section">
          <MdSchool size={24} />
          <p>Welcome to  - your dedicated social platform for students! We're here to help you connect, collaborate, and succeed in your academic journey.</p>
        </div>
        <div className="about-section">
          <MdGroup size={24} />
          <p>Our platform enables students to build meaningful connections, share study resources, join study groups, and engage in academic discussions with peers from around the world.</p>
        </div>
        <div className="about-section">
          <MdConnectWithoutContact size={24} />
          <p>Join our growing community of students and transform your learning experience through social collaboration and peer support.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
