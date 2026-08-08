'use client';

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react';
import './ScrollReveal.css';

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** HTML element to render. Defaults to `div`. */
  as?: ElementType;
  /** Slide direction before entering view. Defaults to `right` (same as Statistics). */
  from?: 'left' | 'right' | 'up' | 'down';
  /** Distance in px for the entrance translate. Defaults to `90`. */
  distance?: number;
  /** Transition duration in seconds. Defaults to `0.7`. */
  duration?: number;
  /** Stagger delay in seconds. Defaults to `0`. */
  delay?: number;
  /** If true, animate only the first time. Defaults to `true` (same as Statistics). */
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
};

export default function ScrollReveal({
  children,
  className = '',
  style,
  as: Tag = 'div',
  from = 'right',
  distance = 90,
  duration = 0.7,
  delay = 0,
  once = true,
  threshold = 0.2,
  rootMargin = '0px 0px -40px 0px',
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold, rootMargin]);

  const offset = {
    left: `translateX(-${distance}px)`,
    right: `translateX(${distance}px)`,
    up: `translateY(-${distance}px)`,
    down: `translateY(${distance}px)`,
  }[from];

  return (
    <Tag
      ref={ref}
      className={`scroll-reveal scroll-reveal--${from} ${className}`.trim()}
      style={
        {
          '--scroll-reveal-offset': offset,
          '--scroll-reveal-duration': `${duration}s`,
          '--scroll-reveal-delay': `${delay}s`,
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
