import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const Achievements = () => {
  const bullets = [
    'Successfully executed Hybrid Solar Power PV & Storage projects with varied technologies.',
    'Rapid expansion from single country business in 2018 to presence in 15 countries now.',
    '100M USD+ Projects completed/under construction in Africa',
    '400M USD+ Projects under development in Africa',
    'Employment opportunities to 1000+ workmen in Africa on projects.',
  ];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % bullets.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="about-stats">
      <div className="about-stats__container">
        <h2 className="section-title text-center text-[#062516]">Our Achievements</h2>
        <div className="about-two-col">
          <div className="about-two-col__video">
            <Image
              src="/assets/our-achievement.jpg"
              alt="Our Achievements"
              width={900}
              height={600}
              className="w-full h-full object-cover rounded-2xl"
              priority
            />
          </div>
          <div className="about-two-col__copy">
            {/* <p className="about-stats__subtitle">Our Achievements</p> */}
            <div className="about-stats__description justify-text">
              <div className="achievement-carousel">
                <div className="achievement-item list-disc pl-6">
                  <span className="sr-only">Achievement</span>
                  <p className="text-lg">{bullets[index]}</p>
                </div>

                <div className="carousel-controls mt-4 flex items-center gap-3 pl-6">
                  <button
                    aria-label="Previous achievement"
                    onClick={() => setIndex(i => (i - 1 + bullets.length) % bullets.length)}
                    className="px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    ←
                  </button>

                  <button
                    aria-label="Next achievement"
                    onClick={() => setIndex(i => (i + 1) % bullets.length)}
                    className="px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* <div className="stats-grid" style={{ marginTop: "2rem" }}>
          <div className="grid-item">
            <div className="content">
              <div className="stat-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21s7-4.438 7-11a7 7 0 10-14 0c0 6.562 7 11 7 11z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                  <path d="M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" stroke="currentColor" strokeWidth="1.8"/>
                </svg>
              </div>
              <h2 className="stat-number">15+ </h2>
              <p className="stat-description">Countries of operation</p>
            </div>
          </div>

          <div className="grid-item">
            <div className="content">
              <div className="stat-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 7h16M6 7v14h12V7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  <path d="M8 11h8M8 15h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </div>
              <h2 className="stat-number">400M USD+ </h2>
              <p className="stat-description">Development Pipeline</p>
            </div>
          </div>

          <div className="grid-item">
            <div className="content">
              <div className="stat-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 11a4 4 0 10-8 0" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M8 21v-2a4 4 0 014-4 4 4 0 014 4v2" stroke="currentColor" strokeWidth="1.8"/>
                </svg>
              </div>
              <h2 className="stat-number">5000+ </h2>
              <p className="stat-description">Employment opportunities to workmen in Africa</p>
            </div>
          </div>

          <div className="grid-item">
            <div className="content">
              <div className="stat-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 14l6-10 6 10H4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                  <path d="M10 14v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  <path d="M6.5 20h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </div>
              <h2 className="stat-number">100MWp </h2>
              <p className="stat-description">delivered &amp; 200MWp+ under Development</p>
            </div>
          </div>

          <div className="grid-item">
            <div className="content">
              <div className="stat-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 7h10v10H7V7z" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M9 12h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  <path d="M7 10H4v10h13v-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="stat-number">60MWh </h2>
              <p className="stat-description">delivered &amp; 50MWh+ under development</p>
            </div>
          </div>

          <div className="grid-item">
            <div className="content">
              <div className="stat-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="stat-number">6+ </h2>
              <p className="stat-description">Renewable energy solutions</p>
            </div>
          </div>
        </div> */}

        {/* inline styles for the new layout + icons */}
        <style jsx>{`
          .about-two-col{
            display:grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
            align-items:center;
            margin-top: 2.25rem;
          }
          .about-two-col__video{ border-radius: 1rem; overflow:hidden; }
          .about-two-col__copy{ }

          .stat-icon{
            width:44px;
            height:44px;
            color:#0ea5e9;
            display:flex;
            align-items:center;
            justify-content:center;
            border-radius:14px;
            background: rgba(14,165,233,0.08);
            margin-bottom: 0.75rem;
          }
          .stat-icon svg{ width:24px; height:24px; }

          /* desktop */
          @media (min-width: 1024px){
            .about-two-col{ grid-template-columns: 1.05fr 0.95fr; }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Achievements; 