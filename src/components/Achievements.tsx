import React from 'react';
import Image from 'next/image';

const Achievements = () => {
  const bullets = [
    'Successfully executed Hybrid Solar Power PV & Storage projects with varied technologies.',
    'Rapid expansion from single country business in 2018 to presence in 15 countries now.',
    '100M USD+ Projects completed/under construction in Africa',
    '400M USD+ Projects under development in Africa',
    'Employment opportunities to 1000+ workmen in Africa on projects.',
  ];

  return (
    <section className="about-stats">
      <div className="about-stats__container">
        <h3 className="section-title text-center text-[#062516]">What Sets Us Apart</h3>
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
            <div className="about-stats__description justify-text">
              <ul className="space-y-4 pl-5 text-base sm:text-lg text-[#062516]">
                {bullets.map((bullet) => (
                  <li key={bullet} className="list-disc marker:text-[#0b5b35] leading-relaxed">
                    {bullet}
                  </li>
                ))}
              </ul>
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
              <h3 className="stat-number">15+ </h3>
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
              <h3 className="stat-number">400M USD+ </h3>
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
              <h3 className="stat-number">5000+ </h3>
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
              <h3 className="stat-number">100MWp </h3>
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
              <h3 className="stat-number">60MWh </h3>
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
              <h3 className="stat-number">6+ </h3>
              <p className="stat-description">Renewable energy solutions</p>
            </div>
          </div>
        </div> */}

        <style jsx>{`
          .about-two-col {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
            align-items: center;
            margin-top: 2.25rem;
          }

          .about-two-col__video {
            border-radius: 1rem;
            overflow: hidden;
          }

          .about-two-col__copy {
            display: flex;
            align-items: center;
          }

          @media (min-width: 1024px) {
            .about-two-col {
              grid-template-columns: 1fr 1fr;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Achievements; 