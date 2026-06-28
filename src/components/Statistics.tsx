import React from 'react';

const stats = [
  {
    value: '15+',
    label: 'Countries of Operation',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21s7-4.438 7-11a7 7 0 10-14 0c0 6.562 7 11 7 11z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    value: '400M USD+',
    label: 'Development Pipeline',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 7h16M6 7v14h12V7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M8 11h8M8 15h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: '5000+',
    label: 'Employment Opportunities for Workmen in Africa',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 11a4 4 0 10-8 0" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 21v-2a4 4 0 014-4 4 4 0 014 4v2" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    value: '100MWp',
    label: 'Delivered & 200MWp+ under Development',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 14l6-10 6 10H4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M10 14v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M6.5 20h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: '60MWh',
    label: 'Delivered & 50MWh+ under Development',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 7h10v10H7V7z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 12h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M7 10H4v10h13v-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    value: '6+',
    label: 'Renewable Energy Solutions',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const Statistics = () => {
  return (
    <section className="about-stats stats-data bg-white">
      <div className="about-stats__container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="grid-item"
              style={{ backgroundColor: index % 2 === 0 ? '#2d4a2d' : '#059666' }}
            >
              <div className="content">
                {/* <div className="stat-icon" aria-hidden="true">
                  {stat.icon}
                </div> */}
                <h2 className="stat-number text-center">{stat.value}</h2>
                <h5 className="stat-description text-center">{stat.label}</h5>
              </div>
            </div>
          ))}
        </div>

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

          .stats-grid {
            display: grid;
            grid-template-columns: repeat(6, minmax(0, 1fr));
            gap: 1rem;
            margin-top: 2rem;
          }

          .grid-item {
            border-radius: 1rem;
            padding: 1.25rem;
            min-height: 180px;
            display: flex;
            align-items: center;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          }

          .content {
            width: 100%;
            color: #fff;
          }

          .stat-icon {
            width: 44px;
            height: 44px;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 14px;
            background: rgba(255, 255, 255, 0.16);
            margin-bottom: 0.75rem;
          }

          .stat-icon svg {
            width: 24px;
            height: 24px;
          }

          .stat-number {
            font-size: clamp(1.3rem, 2vw, 1.8rem);
            font-weight: 700;
            margin: 0 0 0.35rem;
            color: #fff;
          }

          .stat-description {
            color: rgba(255, 255, 255, 0.92);
            font-size: 0.95rem;
            line-height: 1.5;
            margin: 0;
          }

          @media (min-width: 1024px) {
            .about-two-col {
              grid-template-columns: 1.05fr 0.95fr;
            }
          }

          @media (max-width: 1023px) {
            .stats-grid {
              grid-template-columns: repeat(3, minmax(0, 1fr));
            }
          }

          @media (max-width: 640px) {
            .stats-grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }

          @media (max-width: 480px) {
            .stats-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Statistics; 