"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getProjects } from "@/lib/projects";
import { sortByFirestoreOrder } from "@/lib/projectRegions";
import { getProjectHref } from "@/lib/projectSlug";
import { Project } from "@/types/project";
import "./AfricaPresenceMap.css";

declare global {
  interface Window {
    am5: any;
    am5map: any;
    am5geodata_worldIndiaLow: any;
    am5themes_Animated: any;
  }
}

type CountryStatus = {
  label: string;
  color: string;
  projects: string;
  capacity: string;
  sites?: number;
};

type GlobeApi = {
  dispose: () => void;
  select: (id: string | null) => void;
  applyColors: (colors: Record<string, string>) => void;
};

const STATUS_COLOR = {
  completed: "#1c4832",
  ongoing: "#62a557",
  upcoming: "#85c54a",
};

const THEME = {
  background: "#ffffff",
  water: "#e4eee6",
  unvisited: "#c5d4c8",
  border: "#d9edd5",
  hover: "#b7c6bc",
  label: "#062516",
};

const STATUS: Record<string, CountryStatus> = {
  UG: { label: "Completed", color: STATUS_COLOR.completed, projects: "_", capacity: "46 MWp" },
  KE: { label: "Completed", color: STATUS_COLOR.completed, projects: "_", capacity: "930 kWp / 1.45 kWh" },
  LR: { label: "Completed", color: STATUS_COLOR.completed, projects: "_", capacity: "_", sites: 39 },
  SL: { label: "Completed", color: STATUS_COLOR.completed, projects: "_", capacity: "_" },
  SN: { label: "Completed", color: STATUS_COLOR.completed, projects: "_", capacity: "_" },
  ST: { label: "Completed", color: STATUS_COLOR.completed, projects: "_", capacity: "_" },
  ZW: { label: "Completed", color: STATUS_COLOR.completed, projects: "_", capacity: "3.5 MWp" },
  ET: { label: "On going", color: STATUS_COLOR.ongoing, projects: "_", capacity: "_" },
  BF: { label: "On going", color: STATUS_COLOR.ongoing, projects: "_", capacity: "_" },
  CV: { label: "On going", color: STATUS_COLOR.ongoing, projects: "_", capacity: "_", sites: 32 },
  MW: { label: "Completed", color: STATUS_COLOR.completed, projects: "_", capacity: "_" },
  RW: { label: "Upcoming", color: STATUS_COLOR.upcoming, projects: "_", capacity: "_" },
  TZ: { label: "Upcoming", color: STATUS_COLOR.upcoming, projects: "_", capacity: "_" },
  ZM: { label: "Upcoming", color: STATUS_COLOR.upcoming, projects: "_", capacity: "_" },
  ZA: { label: "Upcoming", color: STATUS_COLOR.upcoming, projects: "_", capacity: "_" },
};

const REVEAL_ORDER = [
  "ET", "ZA", "ZW", "LR", "SL", "RW", "KE", "UG", "ZM", "TZ", "BF", "ST", "CV", "SN", "MW",
];

const COUNTRY_NAME: Record<string, string> = {
  ET: "Ethiopia",
  ZA: "South Africa",
  ZW: "Zimbabwe",
  LR: "Liberia",
  SL: "Sierra Leone",
  RW: "Rwanda",
  KE: "Kenya",
  UG: "Uganda",
  ZM: "Zambia",
  TZ: "Tanzania",
  BF: "Burkina Faso",
  ST: "São Tomé",
  CV: "Cape Verde",
  SN: "Senegal",
  MW: "Malawi",
  IN: "India",
};

const FALLBACK_COORDS: Record<string, [number, number]> = {
  CV: [-23.04, 16.0],
  ST: [6.61, 0.19],
};

const HOME_ID = "IN";
const AFRICA = { longitude: 18, latitude: 1.6, rotationX: -18, rotationY: -1.6, zoom: 1 };
const INDIA = { longitude: 78.96, latitude: 20.59, rotationX: -78.96, rotationY: -20.59, zoom: 1 };
const ANIMATION_MS = 700;
const PLACE_MS = 35;
const INTRO_HOLD_MS = 200;

const LEGEND = [
  { color: STATUS_COLOR.completed, label: "Completed Projects" },
  { color: STATUS_COLOR.ongoing, label: "On Going Projects" },
  { color: STATUS_COLOR.upcoming, label: "Upcoming Projects" },
];

const NAME_TO_CODE: Record<string, string> = {
  uganda: "UG",
  kenya: "KE",
  liberia: "LR",
  "sierra leone": "SL",
  senegal: "SN",
  "sao tome and principe": "ST",
  "sao tome": "ST",
  ethiopia: "ET",
  "burkina faso": "BF",
  "cape verde": "CV",
  "cabo verde": "CV",
  malawi: "MW",
  rwanda: "RW",
  tanzania: "TZ",
  zambia: "ZM",
  "south africa": "ZA",
  zimbabwe: "ZW",
};

const AMCHARTS_SCRIPTS = [
  "https://cdn.amcharts.com/lib/5/index.js",
  "https://cdn.amcharts.com/lib/5/map.js",
  "https://cdn.amcharts.com/lib/5/geodata/worldIndiaLow.js",
  "https://cdn.amcharts.com/lib/5/themes/Animated.js",
];

function displayName(id: string) {
  return COUNTRY_NAME[id] || id;
}

function projectCountLabel(id: string | null, count: number) {
  if (!id) return "_";
  const sites = STATUS[id]?.sites;
  return sites ? `${count} (${sites} Sites)` : String(count);
}

function projectListLabel(project: Project) {
  const raw = (project.detailProjectName || project.title || "").trim();
  const comma = raw.indexOf(",");
  const label = (comma === -1 ? raw : raw.slice(0, comma)).trim();
  return label || project.title;
}

function projectHoverColor(project: Project, countryId: string | null) {
  const status = (project.status || "").toLowerCase();
  if (status.includes("plan")) return STATUS_COLOR.upcoming;
  if (
    status.includes("completed") ||
    status.includes("operation") ||
    status.includes("maintenance")
  ) {
    return STATUS_COLOR.completed;
  }
  if (status.includes("construction") || status.includes("development")) {
    return STATUS_COLOR.ongoing;
  }
  return (countryId && STATUS[countryId]?.color) || STATUS_COLOR.ongoing;
}

function projectHoverStyle(project: Project, countryId: string | null): CSSProperties {
  const color = projectHoverColor(project, countryId);
  const ink = color === STATUS_COLOR.completed ? "#f6faf5" : "var(--color-text-dark)";
  return {
    ["--project-hover" as string]: color,
    ["--project-hover-ink" as string]: ink,
  };
}

function canOpenDetails(id: string) {
  return Boolean(STATUS[id] && STATUS[id].label !== "Upcoming");
}

function normalizeCountry(value?: string) {
  return (value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function countryCodeFor(project: Project) {
  const raw = normalizeCountry(project.country);
  if (!raw) return null;
  if (NAME_TO_CODE[raw]) return NAME_TO_CODE[raw];
  const upper = raw.toUpperCase();
  if (STATUS[upper]) return upper;
  return null;
}

function projectsForCode(code: string, projects: Project[]) {
  return sortByFirestoreOrder(
    projects.filter((project) => countryCodeFor(project) === code),
  );
}

function isCompletedProjectStatus(status?: string) {
  const value = (status || "").toLowerCase();
  return (
    value.includes("completed") ||
    value.includes("operation") ||
    value.includes("maintenance")
  );
}

function isOngoingProjectStatus(status?: string) {
  const value = (status || "").toLowerCase();
  if (isCompletedProjectStatus(value)) return false;
  return value.includes("construction") || value.includes("development");
}

function resolvedCountryStatus(code: string, projects: Project[]) {
  const fallback = STATUS[code];
  const list = projectsForCode(code, projects);
  if (!fallback) {
    return { label: "Upcoming", color: STATUS_COLOR.upcoming, projects: "_", capacity: "_" };
  }
  if (!list.length) return fallback;

  if (list.every((project) => isCompletedProjectStatus(project.status))) {
    return { ...fallback, label: "Completed", color: STATUS_COLOR.completed };
  }
  if (list.some((project) => isOngoingProjectStatus(project.status))) {
    return { ...fallback, label: "On going", color: STATUS_COLOR.ongoing };
  }
  if (list.every((project) => (project.status || "").toLowerCase().includes("plan"))) {
    return { ...fallback, label: "Upcoming", color: STATUS_COLOR.upcoming };
  }
  return fallback;
}

function countryColorsFromProjects(projects: Project[]) {
  const colors: Record<string, string> = {};
  Object.keys(STATUS).forEach((code) => {
    colors[code] = resolvedCountryStatus(code, projects).color;
  });
  return colors;
}

function coverForCode(code: string, projects: Project[]) {
  return (
    projectsForCode(code, projects).find((project) => project.imageUrl)?.imageUrl ||
    ""
  );
}

function loadScript(src: string) {
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector(`script[data-am5="${src}"]`) as HTMLScriptElement | null;
    if (existing) {
      if (existing.dataset.loaded === "1") resolve();
      else existing.addEventListener("load", () => resolve(), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.dataset.am5 = src;
    script.onload = () => {
      script.dataset.loaded = "1";
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

let amchartsPromise: Promise<void> | null = null;

function loadAmCharts() {
  if (amchartsPromise) return amchartsPromise;
  amchartsPromise = (async () => {
    for (const src of AMCHARTS_SCRIPTS) {
      await loadScript(src);
    }
    const start = Date.now();
    while (
      !window.am5 ||
      !window.am5map ||
      !window.am5geodata_worldIndiaLow ||
      !window.am5themes_Animated
    ) {
      if (Date.now() - start > 12000) {
        throw new Error("amCharts failed to initialize");
      }
      await new Promise((resolve) => setTimeout(resolve, 40));
    }
  })();
  return amchartsPromise;
}

function centroidOf(polygonSeries: any, id: string) {
  const dataItem = polygonSeries.getDataItemById(id);
  const polygon = dataItem?.get("mapPolygon");
  if (polygon?.geoCentroid) {
    const point = polygon.geoCentroid();
    if (point && Number.isFinite(point.longitude) && Number.isFinite(point.latitude)) {
      return point;
    }
  }
  const fallback = FALLBACK_COORDS[id];
  if (fallback) return { longitude: fallback[0], latitude: fallback[1] };
  return null;
}

function bulletSprite(dataItem: any) {
  if (!dataItem) return null;
  const bullets = dataItem.bullets;
  if (!bullets) return null;
  const bullet =
    typeof bullets.getIndex === "function" ? bullets.getIndex(0) : bullets[0];
  return bullet?.get("sprite") ?? null;
}

function createPresenceGlobe(options: {
  host: HTMLElement;
  reducedMotion: boolean;
  onSelect: (id: string | null, name: string) => void;
}): GlobeApi {
  const { am5, am5map, am5geodata_worldIndiaLow, am5themes_Animated } = window;
  const timeouts: number[] = [];
  const later = (fn: () => void, ms: number) => {
    timeouts.push(window.setTimeout(fn, ms));
  };
  const clearTimers = () => {
    timeouts.splice(0).forEach((id) => window.clearTimeout(id));
  };

  const root = am5.Root.new(options.host);
  root.setThemes([am5themes_Animated.new(root)]);
  root._logo?.dispose();

  const chart = root.container.children.push(
    am5map.MapChart.new(root, {
      panX: "rotateX",
      panY: "rotateY",
      projection: am5map.geoOrthographic(),
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 12,
      paddingRight: 12,
      maxZoomLevel: 6,
      minZoomLevel: 0.85,
      zoomStep: 1.25,
      wheelX: "none",
      wheelY: "none",
      animationDuration: ANIMATION_MS,
      animationEasing: am5.ease.inOut(am5.ease.cubic),
      rotationX: INDIA.rotationX,
      rotationY: INDIA.rotationY,
      zoomLevel: INDIA.zoom,
      homeGeoPoint: { longitude: AFRICA.longitude, latitude: AFRICA.latitude },
      homeZoomLevel: AFRICA.zoom,
      homeRotationX: AFRICA.rotationX,
      homeRotationY: AFRICA.rotationY,
      background: am5.Rectangle.new(root, {
        fill: am5.color(THEME.background),
        fillOpacity: 1,
      }),
    }),
  );

  const waterSeries = chart.series.push(
    am5map.MapPolygonSeries.new(root, { fill: am5.color(THEME.water) }),
  );
  waterSeries.mapPolygons.template.setAll({
    fill: am5.color(THEME.water),
    fillOpacity: 1,
    strokeOpacity: 0,
  });
  waterSeries.data.push({
    geometry: am5map.getGeoRectangle(90, 180, -90, -180),
  });

  const graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}));
  graticuleSeries.mapLines.template.setAll({
    stroke: am5.color(0x000000),
    strokeOpacity: 0.12,
  });

  const polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
  polygonSeries.mapPolygons.template.setAll({
    fill: am5.color(THEME.unvisited),
    fillOpacity: 0.85,
    stroke: am5.color(THEME.border),
    strokeWidth: 0.35,
    tooltipText: "{name}",
    interactive: true,
    toggleKey: "none",
  });
  polygonSeries.mapPolygons.template.states.create("hover", {
    fill: am5.color(THEME.hover),
  });
  polygonSeries.mapPolygons.template.adapters.add(
    "cursorOverStyle",
    (_style: string, target: any) => {
      const id = target.dataItem?.dataContext?.id;
      return canOpenDetails(id) ? "pointer" : "default";
    },
  );

  const pinSeries = chart.series.push(
    am5map.MapPointSeries.new(root, { idField: "id" }),
  );
  pinSeries.bullets.push(() => {
    const circle = am5.Circle.new(root, {
      radius: 4,
      fill: am5.color(THEME.unvisited),
      stroke: am5.color(THEME.label),
      strokeWidth: 1,
      strokeOpacity: 0.7,
      tooltipText: "{name}",
      opacity: 0,
    });
    circle.events.on("click", (event: any) => {
      const id = event.target.dataItem?.dataContext?.id;
      if (id && canOpenDetails(id)) handleSelect(id);
    });
    return am5.Bullet.new(root, { sprite: circle });
  });

  const nameSeries = chart.series.push(
    am5map.MapPointSeries.new(root, { idField: "id" }),
  );
  nameSeries.bullets.push(() => {
    const label = am5.Label.new(root, {
      text: "{name}",
      fill: am5.color(THEME.label),
      fontSize: 11,
      fontWeight: "600",
      fontFamily: "Inter, var(--font-inter), sans-serif",
      centerX: am5.p50,
      centerY: am5.p50,
      opacity: 0,
      populateText: true,
      paddingTop: 3,
      paddingBottom: 3,
      paddingLeft: 7,
      paddingRight: 7,
      background: am5.RoundedRectangle.new(root, {
        fill: am5.color(0xffffff),
        fillOpacity: 0.94,
        cornerRadiusTL: 4,
        cornerRadiusTR: 4,
        cornerRadiusBL: 4,
        cornerRadiusBR: 4,
        stroke: am5.color(THEME.label),
        strokeOpacity: 0.12,
        strokeWidth: 1,
      }),
    });
    return am5.Bullet.new(root, { sprite: label });
  });

  const setPolygonFill = (id: string, color: string, opacity = 1) => {
    const polygon = polygonSeries.getDataItemById(id)?.get("mapPolygon");
    if (!polygon) return;
    polygon.animate({
      key: "fill",
      to: am5.color(color),
      duration: 220,
      easing: am5.ease.out(am5.ease.cubic),
    });
    polygon.animate({ key: "fillOpacity", to: opacity, duration: 180 });
    polygon.states.lookup("hover")?.set("fill", am5.color(color));
  };

  const setSpriteOpacity = (series: any, id: string, opacity: number, fill?: string) => {
    const sprite = bulletSprite(series.getDataItemById(id));
    if (!sprite) return;
    if (fill) sprite.set("fill", am5.color(fill));
    sprite.animate({ key: "opacity", to: opacity, duration: 180 });
  };

  const rotateTo = (view: typeof AFRICA | typeof INDIA, duration: number) => {
    chart.animate({
      key: "rotationX",
      to: view.rotationX,
      duration,
      easing: am5.ease.inOut(am5.ease.cubic),
    });
    chart.animate({
      key: "rotationY",
      to: view.rotationY,
      duration,
      easing: am5.ease.inOut(am5.ease.cubic),
    });
    chart.animate({
      key: "zoomLevel",
      to: view.zoom,
      duration,
      easing: am5.ease.inOut(am5.ease.cubic),
    });
  };

  let selectedId: string | null = null;
  const handleSelect = (id: string) => {
    if (!canOpenDetails(id)) return;
    if (selectedId === id) {
      selectedId = null;
      options.onSelect(null, "");
      setActiveStroke(null);
      rotateTo(AFRICA, 900);
      return;
    }
    selectedId = id;
    options.onSelect(id, displayName(id));
    setActiveStroke(id);
    const point = centroidOf(polygonSeries, id);
    if (!point) return;
    chart.animate({
      key: "rotationX",
      to: -point.longitude,
      duration: 1100,
      easing: am5.ease.inOut(am5.ease.cubic),
    });
    chart.animate({
      key: "rotationY",
      to: -point.latitude,
      duration: 1100,
      easing: am5.ease.inOut(am5.ease.cubic),
    });
    chart.animate({
      key: "zoomLevel",
      to: Math.max(AFRICA.zoom, 2.15),
      duration: 1100,
      easing: am5.ease.inOut(am5.ease.cubic),
    });
  };

  const setActiveStroke = (id: string | null) => {
    polygonSeries.mapPolygons.each((polygon: any) => {
      const pid = polygon.dataItem?.get("id") || polygon.dataItem?.dataContext?.id;
      polygon.animate({
        key: "strokeWidth",
        to: pid === id ? 1.6 : 0.35,
        duration: 200,
      });
      polygon.set("stroke", am5.color(pid === id ? THEME.label : THEME.border));
    });
  };

  polygonSeries.mapPolygons.template.events.on("click", (event: any) => {
    const id = event.target.dataItem?.dataContext?.id;
    if (id && canOpenDetails(id)) handleSelect(id);
    else {
      selectedId = null;
      options.onSelect(null, "");
      setActiveStroke(null);
    }
  });

  const paintUnvisited = () => {
    polygonSeries.mapPolygons.each((polygon: any) => {
      const id = polygon.dataItem?.dataContext?.id;
      polygon.set("fill", am5.color(THEME.unvisited));
      polygon.set("fillOpacity", 0.85);
      polygon.set("strokeWidth", 0.35);
      polygon.set("stroke", am5.color(THEME.border));
    });
    REVEAL_ORDER.forEach((id) => {
      setSpriteOpacity(nameSeries, id, 0);
      setSpriteOpacity(pinSeries, id, 0);
    });
    setSpriteOpacity(nameSeries, HOME_ID, 1, THEME.label);
  };

  const paintCountry = (id: string, color: string) => {
    const polygon = polygonSeries.getDataItemById(id)?.get("mapPolygon");
    if (polygon) setPolygonFill(id, color, 1);
    setSpriteOpacity(nameSeries, id, 0.92, THEME.label);
    if (!polygon || FALLBACK_COORDS[id]) {
      setSpriteOpacity(pinSeries, id, 1, color);
    }
  };

  const revealCountry = (id: string) => {
    paintCountry(id, STATUS[id]?.color || THEME.unvisited);
  };

  const playIntro = () => {
    clearTimers();
    selectedId = null;
    options.onSelect(null, "");
    paintUnvisited();
    rotateTo(INDIA, 0);
    setSpriteOpacity(nameSeries, HOME_ID, 1);

    const travel = options.reducedMotion ? 0 : ANIMATION_MS;
    later(() => {
      rotateTo(AFRICA, travel);
    }, options.reducedMotion ? 0 : INTRO_HOLD_MS);

    later(() => {
      setSpriteOpacity(nameSeries, HOME_ID, 0);
      REVEAL_ORDER.forEach((id, index) => {
        later(() => revealCountry(id), options.reducedMotion ? 0 : index * PLACE_MS);
      });
    }, options.reducedMotion ? 80 : INTRO_HOLD_MS + travel);
  };

  let introBound = false;
  polygonSeries.events.on("datavalidated", () => {
    if (introBound) return;
    introBound = true;
    const names: { id: string; name: string; geometry: { type: string; coordinates: number[] } }[] = [];
    const pins: { id: string; name: string; geometry: { type: string; coordinates: number[] } }[] = [];

    [...REVEAL_ORDER, HOME_ID].forEach((id) => {
      const point = centroidOf(polygonSeries, id);
      if (!point) return;
      names.push({
        id,
        name: displayName(id),
        geometry: { type: "Point", coordinates: [point.longitude, point.latitude] },
      });
      if (FALLBACK_COORDS[id] || !polygonSeries.getDataItemById(id)) {
        pins.push({
          id,
          name: displayName(id),
          geometry: { type: "Point", coordinates: [point.longitude, point.latitude] },
        });
      }
    });

    nameSeries.data.setAll(names);
    pinSeries.data.setAll(pins);
    root.events.once("frameended", () => playIntro());
  });

  polygonSeries.set("geoJSON", am5geodata_worldIndiaLow);
  chart.appear(280, 40);
  root._logo?.dispose();

  return {
    dispose: () => {
      clearTimers();
      root.dispose();
    },
    select: (id) => {
      if (!id) {
        selectedId = null;
        setActiveStroke(null);
        rotateTo(AFRICA, 900);
        return;
      }
      if (selectedId === id) return;
      handleSelect(id);
    },
    applyColors: (colors) => {
      Object.keys(STATUS).forEach((id) => {
        const color = colors[id] || STATUS[id]?.color || THEME.unvisited;
        const polygon = polygonSeries.getDataItemById(id)?.get("mapPolygon");
        if (polygon) setPolygonFill(id, color, 1);
        const pin = bulletSprite(pinSeries.getDataItemById(id));
        if (pin) pin.set("fill", am5.color(color));
      });
    },
  };
}

export default function AfricaPresenceMap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeApi | null>(null);
  const [inView, setInView] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [allProjects, setAllProjects] = useState<Project[]>([]);

  const clearSelection = useCallback(() => {
    setSelectedId(null);
    setSelectedName("");
    setCoverImage("");
    globeRef.current?.select(null);
  }, []);

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
      { threshold: 0.25 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    getProjects()
      .then(setAllProjects)
      .catch((error) => {
        console.error("Failed to load projects:", error);
      });
  }, []);

  useEffect(() => {
    if (!selectedId) {
      setCoverImage("");
      return;
    }
    setCoverImage(coverForCode(selectedId, allProjects));
  }, [selectedId, allProjects]);

  useEffect(() => {
    if (!mapReady || !globeRef.current || !allProjects.length) return;
    globeRef.current.applyColors(countryColorsFromProjects(allProjects));
  }, [allProjects, mapReady]);

  useEffect(() => {
    if (!inView || !chartRef.current) return;
    let cancelled = false;
    const host = chartRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    loadAmCharts()
      .then(() => {
        if (cancelled || !host) return;
        globeRef.current?.dispose();
        globeRef.current = createPresenceGlobe({
          host,
          reducedMotion,
          onSelect: (id, name) => {
            setSelectedId(id);
            setSelectedName(name);
          },
        });
        setMapReady(true);
      })
      .catch((error) => {
        console.error("Failed to load presence globe:", error);
        if (!cancelled) setMapError(true);
      });

    return () => {
      cancelled = true;
      globeRef.current?.dispose();
      globeRef.current = null;
    };
  }, [inView]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && selectedId) clearSelection();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [clearSelection, selectedId]);

  const selectedProjects = useMemo(
    () => (selectedId ? projectsForCode(selectedId, allProjects) : []),
    [selectedId, allProjects],
  );

  return (
    <section
      className="africa-presence-section"
      aria-label="JIVO Energy in Africa"
    >
      <div className="africa-presence-section__inner">
        <div className="africa-presence-section__head">
          <h3 className="section-title-spl">JIVO Energy in Africa</h3>
        </div>
        <div
          ref={sectionRef}
          className={`africa-presence${selectedId ? " is-detail-open" : ""}`}
        >
          <aside
            className="africa-presence__panel"
            aria-hidden={selectedId ? "false" : "true"}
          >
            <div className="africa-presence__panel-inner">
              <button
                className="africa-presence__close"
                type="button"
                aria-label="Close country details"
                onClick={clearSelection}
              >
                &times;
              </button>
              {coverImage ? (
                <div className="africa-presence__visual africa-presence__visual--photo">
                  <Image
                    src={coverImage}
                    alt={selectedName}
                    fill
                    className="africa-presence__cover object-cover"
                    sizes="360px"
                  />
                </div>
              ) : null}
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
              <dl className="africa-presence__meta">
                <div>
                  <dt>No. of projects</dt>
                  <dd>{projectCountLabel(selectedId, selectedProjects.length)}</dd>
                </div>
              </dl>
              {selectedProjects.length > 0 ? (
                <ul className="africa-presence__projects">
                  {selectedProjects.map((project, index) => (
                    <li key={project.id || project.slug || project.title}>
                      <Link
                        href={getProjectHref(project)}
                        className="africa-presence__project"
                        style={projectHoverStyle(project, selectedId)}
                      >
                        <span className="africa-presence__project-index">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="africa-presence__project-name">
                          {projectListLabel(project)}
                        </span>
                        <ArrowRight
                          className="africa-presence__project-go"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </aside>
          <div className="africa-presence__stage">
            <div className="africa-presence__map">
              <div
                ref={chartRef}
                className="africa-presence__globe"
                role="img"
                aria-label="Animated world globe showing JIVO Energy countries in Africa"
              />
              {!mapReady && !mapError ? (
                <div className="africa-presence__loading">Loading map…</div>
              ) : null}
              {mapError ? (
                <div className="africa-presence__loading">
                  Map could not be loaded.
                </div>
              ) : null}
            </div>
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
          </div>
        </div>
      </div>
    </section>
  );
}
