'use client';

import { useEffect, useRef, useState } from 'react';
import './Statistics.css';

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
    label: (
      <>
        Delivered &
        <br />
        200MWp+
        <br />
        under Development
      </>
    ),
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
    label: (
      <>
        Delivered &
        <br />
        50MWh+
        <br />
        under Development
      </>
    ),
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

const formatCounterValue = (value: number, suffix: string) => {
  const formattedValue = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(value);

  return `${formattedValue}${suffix}`;
};

const parseStatValue = (value: string) => {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);

  if (!match) {
    return { target: 0, suffix: value };
  }

  return {
    target: Number(match[1]),
    suffix: match[2],
  };
};

const AnimatedStatValue = ({ value, textColor }: { value: string; textColor: string }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);
  const valueRef = useRef<HTMLHeadingElement | null>(null);
  const { target, suffix } = parseStatValue(value);

  useEffect(() => {
    const node = valueRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) {
      return;
    }

    let animationFrame: number;
    const duration = 1600;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const nextValue = target * easedProgress;

      setDisplayValue(nextValue);

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    animationFrame = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [hasStarted, target]);

  return (
    <h3 ref={valueRef} className="stat-number text-center" style={{ color: textColor }} aria-label={value}>
      {formatCounterValue(displayValue, suffix)}
    </h3>
  );
};

const Statistics = () => {
  return (
    <section className="about-stats stats-data bg-white">
      <div className="about-stats__container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div
              key={stat.value}
              className="grid-item"
              style={{ backgroundColor: index % 2 === 0 ? '#85c54a' : '#1c4832', color: index % 2 === 0 ? '#125d36' : '#ffffff' }}
            >
              <div className="content">
                {/* <div className="stat-icon" aria-hidden="true">
                  {stat.icon}
                </div> */}
                <AnimatedStatValue value={stat.value} textColor={index % 2 === 0 ? '#125d36' : '#ffffff'} />
                <h3 className="stat-description text-center text-bold" style={{ color: index % 2 === 0 ? '#125d36' : '#ffffff' }}>{stat.label}</h3>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default Statistics; 