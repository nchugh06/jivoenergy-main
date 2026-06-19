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
          <p className="about-stats__description justify-text">
            {/* With over two decades of experience in renewable energy development, we have established
            ourselves as a trusted partner in the clean energy transition, delivering innovative solutions
            across multiple markets. */}
            JIVO Energy is a renewable energy and infrastructure company focused on delivering sustainable, reliable, and future-ready energy solutions across Africa and emerging markets. Since 2018, we have been actively engaged in project development, engineering, procurement and construction (EPC), operations & maintenance, battery energy storage systems (BESS), and energy infrastructure development.<br></br>            
          </p>
          <a
                    href={`/about`}
                    className="inline-block mt-6 px-6 py-3 bg-[#fafafa] text-black rounded-lg font-medium transition-colors duration-300 text-center"
                  >
                    Read More
                  </a>
        </div>

        <div className="stats-grid">
          <div className="grid-item" data-counter="">
            <div className="content">
              <h2 className="stat-number">100 MWp+</h2>
              <p className="stat-description">Solar PV Constructed</p>
            </div>
            <div>
              <img src="/logo1.png" alt="Solar panels" />
            </div>
          </div>

          <div className="grid-item" data-counter="02">
            <div className="content">
              <h2 className="stat-number">1000+</h2>
              <p className="stat-description">Employment Opportunities Created</p>
            </div>
            <div>
              <img src="/logo1.png" alt="Team working" />
            </div>
          </div>

          <div className="grid-item" data-counter="03">
            <div className="content">
              <h2 className="stat-number">60 MWh</h2>
              <p className="stat-description">BESS Delivered</p>
            </div>
            <div>
              <img src="/logo1.png" alt="Team working" />
            </div>
          </div>

          <div className="grid-item" data-counter="04">
            <div className="content">
              <h2 className="stat-number">15+</h2>
              <p className="stat-description">Countries with Active Projects</p>
            </div>
            <div>
              <img src="/logo1.png" alt="Global map" />
            </div>
          </div>

          <div className="grid-item" data-counter="05">
            <div className="content">
              <h2 className="stat-number">200 MWp+</h2>
              <p className="stat-description">Solar PV Pipeline</p>
            </div>
            <div>
              <img src="/logo1.png" alt="Earth from space" />
            </div>
          </div>

          <div className="grid-item" data-counter="06">
            <div className="content">
              <h2 className="stat-number">50 Mwh</h2>
              <p className="stat-description">BESS Pipeline</p>
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