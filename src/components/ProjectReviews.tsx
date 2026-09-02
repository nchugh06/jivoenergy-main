"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { YOUTUBE_CHANNEL_URL } from "@/lib/gallery";
import { GalleryVideo } from "@/types/gallery";
import "./ProjectReviews.css";

type ProjectReviewsProps = {
  country?: string;
  variant?: "home" | "project";
};

export default function ProjectReviews({
  country,
  variant = "project",
}: ProjectReviewsProps) {
  const isHome = variant === "home";
  const [videos, setVideos] = useState<GalleryVideo[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const params = new URLSearchParams();
        if (country) params.set("country", country);
        const url = params.toString() ? `/api/gallery?${params.toString()}` : "/api/gallery";
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load gallery videos");
        const data = await res.json();
        if (!cancelled) setVideos(data.items || []);
      } catch (error) {
        console.error("Error loading gallery videos:", error);
        if (!cancelled) setVideos([]);
      } finally {
        if (!cancelled) setLoaded(true);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [country]);

  if (!loaded || !videos.length) return null;

  return (
    <section
      className={`project-reviews project-reviews--${variant}`}
      id="project-reviews"
      aria-label="Project reviews"
    >
      <div className="project-reviews__inner">
        <div className={`project-reviews__head project-reviews__head--${variant}`}>
          {isHome ? (
            <>
              <h2 className="section-title section-title-lock">Project Gallery</h2>
              <a
                className="project-reviews__channel"
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch all on YouTube
                <span aria-hidden="true">→</span>
              </a>
            </>
          ) : (
            <h2 className="project-news__title">Watch Project Videos</h2>
          )}
        </div>

        <div className="project-reviews__grid">
          {videos.map((video) => (
            <a
              key={video.id}
              className="project-reviews__card"
              href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Watch ${video.title} on YouTube`}
            >
              <span className="project-reviews__thumb">
                {video.thumbnail ? (
                  <Image
                    src={video.thumbnail}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : null}
                <span className="project-reviews__play" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5.14v13.72L19 12 8 5.14z" />
                  </svg>
                </span>
                {video.duration ? (
                  <span className="project-reviews__duration">{video.duration}</span>
                ) : null}
              </span>
              <span className="project-reviews__card-body">
                <span className="project-reviews__card-kicker">YouTube</span>
                <span className="project-reviews__card-title">{video.title}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
