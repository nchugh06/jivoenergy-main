'use client';

import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import ScrollReveal from '@/components/ScrollReveal';
import './Statistics.css';

const MOBILE_QUERY = '(max-width: 767px)';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return isMobile;
}

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

function StatCard({
  stat,
  index,
}: {
  stat: (typeof stats)[number];
  index: number;
}) {
  const isEven = index % 2 === 0;
  const color = isEven ? '#125d36' : '#ffffff';

  return (
    <div className="content">
      <h3 className="stat-number" style={{ color }}>
        {stat.value}
      </h3>
      <h3 className="stat-description text-bold" style={{ color }}>
        {stat.label}
      </h3>
    </div>
  );
}

const Statistics = () => {
  const isMobile = useIsMobile();

  return (
    <section className="about-stats stats-data bg-white">
      <div className="about-stats__container">
        <div className="stats-grid">
          {stats.map((stat, index) => {
            const itemStyle: CSSProperties = {
              backgroundColor: index % 2 === 0 ? '#85c54a' : '#1c4832',
              color: index % 2 === 0 ? '#125d36' : '#ffffff',
            };

            const card: ReactNode = <StatCard stat={stat} index={index} />;

            if (isMobile) {
              return (
                <div key={stat.value} className="grid-item" style={itemStyle}>
                  {card}
                </div>
              );
            }

            return (
              <ScrollReveal
                key={stat.value}
                className="grid-item"
                delay={(index + 1) * 0.15}
                from="right"
                distance={90}
                style={itemStyle}
              >
                {card}
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
