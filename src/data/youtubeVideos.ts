export type YoutubeVideo = {
  id: string;
  title: string;
  thumbnail: string;
  duration?: string;
};

export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@JIVOEnergy";

export const YOUTUBE_VIDEOS: YoutubeVideo[] = [
  {
    id: "3y1EAJ7Nrd4",
    title:
      "JIVO Energy Commissions Malawi’s First Utility-Scale Battery Storage System | Powering Africa",
    thumbnail: "/youtube/youtube1.avif",
    duration: "4:48",
  },
  {
    id: "VX54jJx6Zpw",
    title:
      "Introducing JIVO Energy | Solar, BESS & Renewable Energy Solutions Across Africa",
    thumbnail: "/youtube/youtube2.avif",
    duration: "2:41",
  },
];
