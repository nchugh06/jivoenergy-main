import Image from "next/image";
import {
  YOUTUBE_CHANNEL_URL,
  YOUTUBE_VIDEOS,
} from "@/data/youtubeVideos";
import "./ProjectReviews.css";

export default function ProjectReviews() {
  return (
    <section className="project-reviews" id="project-reviews" aria-label="Project reviews">
      <div className="project-reviews__inner">
        <div className="project-reviews__head">
          <h3 className="section-title">Project Reviews</h3>
          <a
            className="project-reviews__channel"
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch all on YouTube
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="project-reviews__grid">
          {YOUTUBE_VIDEOS.map((video) => (
            <a
              key={video.id}
              className="project-reviews__card"
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Watch ${video.title} on YouTube`}
            >
              <span className="project-reviews__thumb">
                <Image
                  src={video.thumbnail}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
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
