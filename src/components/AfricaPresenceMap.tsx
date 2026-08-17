'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import './AfricaPresenceMap.css';

type CountryStatus = {
  label: string;
  color: string;
  projects: string;
  capacity: string;
};

type CalloutItem = {
  id: string;
  name: string;
  status: CountryStatus;
  side: 'left' | 'right';
  cx: number;
  cy: number;
  left: number;
  right: number;
  ax: number;
  ay: number;
  ly: number;
  edgeX: number;
  x: number;
  w: number;
  h: number;
  el: HTMLButtonElement;
};

const STATUS: Record<string, CountryStatus> = {
  UG: { label: 'Completed', color: '#1c4832', projects: '_', capacity: '_' },
  KE: { label: 'Completed', color: '#1c4832', projects: '_', capacity: '_' },
  LR: { label: 'Completed', color: '#1c4832', projects: '_', capacity: '_' },
  SL: { label: 'Completed', color: '#1c4832', projects: '_', capacity: '_' },
  SN: { label: 'Completed', color: '#1c4832', projects: '_', capacity: '_' },
  ST: { label: 'Completed', color: '#1c4832', projects: '_', capacity: '_' },
  ET: { label: 'On going', color: '#85c54a', projects: '_', capacity: '_' },
  BF: { label: 'On going', color: '#85c54a', projects: '_', capacity: '_' },
  CV: { label: 'On going', color: '#85c54a', projects: '_', capacity: '_' },
  MW: { label: 'On going', color: '#85c54a', projects: '_', capacity: '_' },
  RW: { label: 'Upcoming', color: '#fafafa', projects: '_', capacity: '_' },
  TZ: { label: 'Upcoming', color: '#fafafa', projects: '_', capacity: '_' },
  ZM: { label: 'Upcoming', color: '#fafafa', projects: '_', capacity: '_' },
  ZA: { label: 'Upcoming', color: '#fafafa', projects: '_', capacity: '_' },
};

const LEFT_IDS = new Set(['CV', 'SN', 'BF', 'SL', 'LR', 'ST']);
const SHORT_NAME: Record<string, string> = {
  'Sao Tome and Principe': 'São Tomé',
};
const NUDGE: Record<string, { dx?: number; dy?: number }> = {
  BF: { dx: -18, dy: 108 },
  RW: { dx: 86, dy: 0 },
  ZM: { dx: 52, dy: 72 },
};

const LEGEND = [
  { color: '#1c4832', label: 'Completed project' },
  { color: '#85c54a', label: 'On going' },
  { color: '#fafafa', label: 'Upcoming project' },
];

function displayName(title: string | null, id: string) {
  const name = title || id;
  return SHORT_NAME[name] || name;
}

function isMobile() {
  return window.matchMedia('(max-width: 700px)').matches;
}

function boxesOverlap(
  a: { x: number; w: number; ly: number; h: number },
  b: { x: number; w: number; ly: number; h: number },
  pad: number
) {
  return (
    a.x < b.x + b.w + pad &&
    a.x + a.w + pad > b.x &&
    a.ly - a.h / 2 < b.ly + b.h / 2 + pad &&
    a.ly + a.h / 2 + pad > b.ly - b.h / 2
  );
}

function placeNearCountry(list: CalloutItem[], side: 'left' | 'right') {
  const line = 16;
  const pad = 6;
  list.sort((a, b) => a.ay - b.ay);
  list.forEach((c) => {
    c.ly = c.ay;
    c.x = side === 'left' ? c.edgeX - line - c.w : c.edgeX + line;
  });

  let moved = true;
  let pass = 0;
  while (moved && pass++ < 16) {
    moved = false;
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        if (!boxesOverlap(list[i], list[j], pad)) continue;
        const a = list[i];
        const b = list[j];
        const outer = side === 'left' ? (a.x <= b.x ? a : b) : a.x >= b.x ? a : b;
        const overlap = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
        outer.x += (side === 'left' ? -1 : 1) * Math.max(10, overlap + pad);
        moved = true;
      }
    }
  }

  list.sort((a, b) => a.ly - b.ly || a.x - b.x);
  for (let i = 1; i < list.length; i++) {
    for (let j = 0; j < i; j++) {
      const row = Math.min(list[i].h, list[j].h) * 0.8;
      if (Math.abs(list[i].ly - list[j].ly) < row) {
        list[i].ly = list[j].ly + (list[j].h + list[i].h) / 2 + 6;
      }
    }
  }
}

function countryShape(path: SVGPathElement, color: string) {
  const b = path.getBBox();
  const pad = Math.max(b.width, b.height, 4) * 0.16;
  const x = b.x - pad;
  const y = b.y - pad;
  const w = b.width + pad * 2;
  const h = b.height + pad * 2;
  const stroke = Math.max(w, h) * 0.008;
  return (
    '<svg viewBox="' +
    x +
    ' ' +
    y +
    ' ' +
    w +
    ' ' +
    h +
    '" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
    '<path d="' +
    (path.getAttribute('d') || '') +
    '" fill="' +
    color +
    '" stroke="#125d36" stroke-width="' +
    stroke +
    '" stroke-linejoin="round"></path>' +
    '</svg>'
  );
}

export default function AfricaPresenceMap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mapAreaRef = useRef<HTMLDivElement>(null);
  const svgHostRef = useRef<HTMLDivElement>(null);
  const lineLayerRef = useRef<SVGSVGElement>(null);
  const labelLayerRef = useRef<HTMLDivElement>(null);
  const selectedIdRef = useRef<string | null>(null);
  const firstPaintRef = useRef(true);
  const pathsBoundRef = useRef(false);
  const [inView, setInView] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState('');
  const [shapeHtml, setShapeHtml] = useState('');
  const [mapReady, setMapReady] = useState(false);

  selectedIdRef.current = selectedId;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(section);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const host = svgHostRef.current;
    if (!host) return;
    let cancelled = false;

    fetch('/africa-map/africa.svg')
      .then((res) => res.text())
      .then((text) => {
        if (cancelled || !host) return;
        const markup = text
          .replace(/<\?xml[\s\S]*?\?>/, '')
          .replace(/<style[\s\S]*?<\/style>/i, '');
        host.innerHTML = markup;
        const svg = host.querySelector('svg');
        if (svg) {
          svg.classList.add('africa-map');
          svg.removeAttribute('width');
          svg.removeAttribute('height');
          svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        }
        setMapReady(true);
      })
      .catch((error) => {
        console.error('Failed to load Africa map:', error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const layout = useCallback(() => {
    const section = sectionRef.current;
    const mapArea = mapAreaRef.current;
    const svg = svgHostRef.current?.querySelector('svg.africa-map') as SVGSVGElement | null;
    const lineLayer = lineLayerRef.current;
    const labelLayer = labelLayerRef.current;
    if (!section || !mapArea || !svg || !lineLayer || !labelLayer) return;

    const findPath = (id: string) => svg.querySelector('#' + id) as SVGPathElement | null;

    const setActive = (id: string | null) => {
      section.querySelectorAll('.is-active').forEach((node) => {
        node.classList.remove('is-active');
      });
      if (!id) return;
      labelLayer.querySelector(`[data-id="${id}"]`)?.classList.add('is-active');
      lineLayer.querySelector(`.africa-presence__line[data-id="${id}"]`)?.classList.add('is-active');
      findPath(id)?.classList.add('is-active');
    };

    const selectCountry = (id: string) => {
      if (selectedIdRef.current === id) {
        setSelectedId(null);
        setSelectedName('');
        setShapeHtml('');
        return;
      }
      const data = STATUS[id];
      const path = findPath(id);
      if (!data || !path) return;
      setSelectedId(id);
      setSelectedName(displayName(path.getAttribute('title'), id));
      setShapeHtml(countryShape(path, data.color));
    };

    if (!pathsBoundRef.current) {
      pathsBoundRef.current = true;
      Object.keys(STATUS).forEach((id) => {
        const path = findPath(id);
        if (!path) return;
        path.classList.add('has-callout');
        path.addEventListener('click', (event) => {
          event.stopPropagation();
          selectCountry(id);
        });
      });
    }

    if (isMobile()) {
      labelLayer.innerHTML = '';
      lineLayer.innerHTML = '';
      mapArea.style.minHeight = '';
      setActive(selectedIdRef.current);
      return;
    }

    const area = mapArea.getBoundingClientRect();
    if (!area.width || !area.height) return;

    const svgToArea = (x: number, y: number) => {
      const pt = svg.createSVGPoint();
      pt.x = x;
      pt.y = y;
      const ctm = svg.getScreenCTM();
      if (!ctm) return { x: 0, y: 0 };
      const screen = pt.matrixTransform(ctm);
      return { x: screen.x - area.left, y: screen.y - area.top };
    };

    const items: CalloutItem[] = [];
    Object.keys(STATUS).forEach((id) => {
      const path = findPath(id);
      if (!path) return;
      const b = path.getBBox();
      items.push({
        id,
        name: displayName(path.getAttribute('title'), id),
        status: STATUS[id],
        side: LEFT_IDS.has(id) ? 'left' : 'right',
        cx: b.x + b.width / 2,
        cy: b.y + b.height / 2,
        left: b.x,
        right: b.x + b.width,
        ax: 0,
        ay: 0,
        ly: 0,
        edgeX: 0,
        x: 0,
        w: 0,
        h: 0,
        el: document.createElement('button'),
      });
    });

    items.forEach((c) => {
      const center = svgToArea(c.cx, c.cy);
      const left = svgToArea(c.left, c.cy);
      const right = svgToArea(c.right, c.cy);
      c.ax = center.x;
      c.ay = center.y;
      c.ly = center.y;
      c.edgeX = c.side === 'left' ? left.x : right.x;
    });

    labelLayer.innerHTML = '';
    lineLayer.setAttribute('viewBox', `0 0 ${Math.round(area.width)} ${Math.round(area.height)}`);
    lineLayer.innerHTML = '';

    items.forEach((c) => {
      const el = document.createElement('button');
      el.type = 'button';
      el.className = `africa-presence__callout callout-${c.side}`;
      el.setAttribute('data-id', c.id);
      el.innerHTML =
        '<span class="tt-color" style="background:' +
        c.status.color +
        '"></span><strong>' +
        c.name +
        '</strong>';
      el.style.left = '0px';
      el.style.top = '0px';
      el.style.visibility = 'hidden';
      el.addEventListener('click', (event) => {
        event.stopPropagation();
        selectCountry(c.id);
      });
      labelLayer.appendChild(el);
      c.el = el;
      c.w = el.offsetWidth;
      c.h = el.offsetHeight;
    });

    placeNearCountry(
      items.filter((c) => c.side === 'left'),
      'left'
    );
    placeNearCountry(
      items.filter((c) => c.side === 'right'),
      'right'
    );

    items.forEach((c) => {
      const n = NUDGE[c.id];
      if (!n) return;
      c.x += n.dx || 0;
      c.ly += n.dy || 0;
    });

    if (firstPaintRef.current) {
      mapArea.classList.add('callouts-animate');
    }

    const ns = 'http://www.w3.org/2000/svg';
    items.forEach((c, i) => {
      const connectX = c.side === 'left' ? c.x + c.w : c.x;
      if (c.side === 'left') {
        c.el.style.left = 'auto';
        c.el.style.right = `${area.width - connectX}px`;
      } else {
        c.el.style.left = `${c.x}px`;
        c.el.style.right = 'auto';
      }
      c.el.style.top = `${c.ly - c.h / 2}px`;
      c.el.style.visibility = 'visible';
      c.el.style.animationDelay = `${0.12 + i * 0.05}s`;

      const line = document.createElementNS(ns, 'line');
      const len = Math.sqrt((c.ax - connectX) ** 2 + (c.ay - c.ly) ** 2);
      line.setAttribute('x1', String(connectX));
      line.setAttribute('y1', String(c.ly));
      line.setAttribute('x2', String(c.ax));
      line.setAttribute('y2', String(c.ay));
      line.setAttribute('class', 'africa-presence__line');
      line.setAttribute('data-id', c.id);
      if (firstPaintRef.current && len > 0) {
        line.style.strokeDasharray = String(len);
        line.style.strokeDashoffset = String(len);
        line.style.animationDelay = `${0.04 + i * 0.05}s`;
      }
      lineLayer.appendChild(line);

      const dot = document.createElementNS(ns, 'circle');
      dot.setAttribute('cx', String(c.ax));
      dot.setAttribute('cy', String(c.ay));
      dot.setAttribute('r', '3.2');
      dot.setAttribute('class', 'africa-presence__dot');
      dot.setAttribute('data-id', c.id);
      dot.setAttribute('fill', c.status.color);
      dot.setAttribute('stroke', '#125d36');
      dot.setAttribute('stroke-width', '1');
      dot.style.animationDelay = `${0.18 + i * 0.05}s`;
      lineLayer.appendChild(dot);
    });

    setActive(selectedIdRef.current);

    if (firstPaintRef.current) {
      firstPaintRef.current = false;
      window.setTimeout(() => {
        mapArea.classList.remove('callouts-animate');
      }, 1800);
    }
  }, []);

  useEffect(() => {
    if (!mapReady) return;
    let ticking = false;
    const schedule = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        layout();
      });
    };

    schedule();
    const fontsReady = document.fonts?.ready?.then(schedule);
    window.addEventListener('resize', schedule);
    const timer = window.setTimeout(schedule, 480);

    return () => {
      window.removeEventListener('resize', schedule);
      window.clearTimeout(timer);
      void fontsReady;
    };
  }, [mapReady, selectedId, layout]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedIdRef.current) {
        setSelectedId(null);
        setSelectedName('');
        setShapeHtml('');
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const selected = selectedId ? STATUS[selectedId] : null;

  return (
    <section className="africa-presence-section" aria-label="JIVO Energy in Africa">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="africa-presence-section__head">
          <h3 className="section-title-spl">JIVO Energy in Africa</h3>
        </div>
        <div
          ref={sectionRef}
          className={`africa-presence${inView ? ' in-view' : ''}${selectedId ? ' is-detail-open' : ''}`}
        >
        <aside className="africa-presence__panel" aria-hidden={selectedId ? 'false' : 'true'}>
          <div className="africa-presence__panel-inner">
            <button
              className="africa-presence__close"
              type="button"
              aria-label="Close country details"
              onClick={() => {
                setSelectedId(null);
                setSelectedName('');
                setShapeHtml('');
              }}
            >
              &times;
            </button>
            <div
              className="africa-presence__visual"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: shapeHtml }}
            />
            <div className="africa-presence__heading">
              {selectedId ? (
                <img
                  className="africa-presence__flag is-ready"
                  src={`/africa-map/flags/${selectedId.toLowerCase()}.svg`}
                  alt=""
                />
              ) : null}
              <h2 className="africa-presence__name">{selectedName}</h2>
            </div>
            {selected ? (
              <p className="africa-presence__status">
                <span className="dot" style={{ background: selected.color }} />
                {selected.label}
              </p>
            ) : null}
            <dl className="africa-presence__meta">
              <div>
                <dt>No. of projects</dt>
                <dd>{selected?.projects ?? '_'}</dd>
              </div>
              <div>
                <dt>Capacity</dt>
                <dd>{selected?.capacity ?? '_'}</dd>
              </div>
            </dl>
          </div>
        </aside>
        <div className="africa-presence__stage">
          <div className="africa-presence__legend-wrap">
            <ul className="africa-presence__legend">
              {LEGEND.map((item) => (
                <li key={item.label}>
                  <span className="dot" style={{ background: item.color }} />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="africa-presence__map" ref={mapAreaRef}>
            <div className="africa-presence__svg-host" ref={svgHostRef} />
            <svg className="africa-presence__lines" ref={lineLayerRef} aria-hidden="true" />
            <div className="africa-presence__callouts" ref={labelLayerRef} />
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
