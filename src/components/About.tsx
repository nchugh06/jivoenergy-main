import React from 'react';

const About = () => {
  return (
    <section className="about-stats">
      <div className="about-stats__container">
        <div className="about-stats__header">
          <p className="about-stats__subtitle">About Us</p>
          {/* <h2 className="about-stats__title">
            <span>Decades Of </span>
            Expertise Dedicated To Success
          </h2> */}
          <p className="about-stats__description">
            {/* With over two decades of experience in renewable energy development, we have established
            ourselves as a trusted partner in the clean energy transition, delivering innovative solutions
            across multiple markets. */}
            We are Africa’s leading provider of integrated renewable energy and sustainable solutions, delivering end-to-end services across Solar, Battery Energy Storage, Hybrid Systems, Waste-To-Energy projects, and Transmission & Distribution infrastructure. Serving commercial, industrial, utility-scale, and community clients, we combine technical expertise, innovative design, and project execution excellence to deliver reliable, efficient, and environmentally responsible energy solutions.<br></br>
          </p>
        </div>

        <div className="stats-grid">
          <div className="grid-item" data-counter="">
            <div className="content">
              <h2 className="stat-number">20 GW</h2>
              <p className="stat-description">of total pipeline in renewable projects</p>
            </div>
            <div>
              <img src="/logo1.png" alt="Solar panels" />
            </div>
          </div>

          <div className="grid-item" data-counter="02">
            <div className="content">
              <h2 className="stat-number">1000+</h2>
              <p className="stat-description">Workforce</p>
            </div>
            <div>
              <img src="/logo1.png" alt="Team working" />
            </div>
          </div>

          <div className="grid-item" data-counter="03">
            <div className="content">
              <h2 className="stat-number">400M USD+</h2>
              <p className="stat-description">Under Construction</p>
            </div>
            <div>
              <img src="/logo1.png" alt="Team working" />
            </div>
          </div>

          <div className="grid-item" data-counter="04">
            <div className="content">
              <h2 className="stat-number">15+</h2>
              <p className="stat-description">Countries</p>
            </div>
            <div>
              <img src="/logo1.png" alt="Global map" />
            </div>
          </div>

          <div className="grid-item" data-counter="05">
            <div className="content">
              <h2 className="stat-number">4+</h2>
              <p className="stat-description">Continents</p>
            </div>
            <div>
              <img src="/logo1.png" alt="Earth from space" />
            </div>
          </div>

          <div className="grid-item" data-counter="06">
            <div className="content">
              <h2 className="stat-number">100M USD+</h2>
              <p className="stat-description">Projects Completed</p>
            </div>
            <div>
              <img src="/logo1.png" alt="Completed solar installation" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 