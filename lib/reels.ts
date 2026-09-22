export type Reel = {
  slug: string;
  src: string;
  poster?: string;
  cover: string;
  title: string;
  tag: string;
  duration: string;
  vertical: string;
};

// Placeholder reel showcases backed by generated test videos in /public/videos.
// To ship real reels: drop the .mp4 into /public/videos and update `src`
// (plus optional `poster` for a custom first frame; omit to keep the gradient).
export const reels: Reel[] = [
  {
    slug: "reel-stallions",
    src: "/videos/reel-stallions.mp4",
    cover: "linear-gradient(135deg, #C10801 0%, #F16001 55%, #D9C3AB 100%)",
    title: "Site walkthrough",
    tag: "Stallions",
    duration: "0:05",
    vertical: "real-estate",
  },
  {
    slug: "reel-akmas",
    src: "/videos/reel-akmas.mp4",
    cover: "linear-gradient(160deg, #0A0A0A 0%, #F16001 60%, #E85002 100%)",
    title: "Packaging reveal",
    tag: "Akmas Perfumes",
    duration: "0:05",
    vertical: "d2c",
  },
  {
    slug: "reel-mansarovar",
    src: "/videos/reel-mansarovar.mp4",
    cover: "linear-gradient(200deg, #F16001 0%, #C10801 60%, #D9C3AB 120%)",
    title: "Possession-ready",
    tag: "Mansarovar Group",
    duration: "0:05",
    vertical: "real-estate",
  },
  {
    slug: "reel-re-content",
    src: "/videos/reel-re-content.mp4",
    cover: "linear-gradient(120deg, #D9C3AB 0%, #E85002 70%, #0A0A0A 100%)",
    title: "Construction update",
    tag: "Real Estate Content",
    duration: "0:05",
    vertical: "real-estate",
  },
  {
    slug: "reel-smm",
    src: "/videos/reel-smm.mp4",
    cover: "linear-gradient(210deg, #C10801 0%, #0A0A0A 60%, #F16001 100%)",
    title: "Behind the reel",
    tag: "Social Media",
    duration: "0:05",
    vertical: "social",
  },
  {
    slug: "reel-influencer",
    src: "/videos/reel-influencer.mp4",
    cover: "linear-gradient(230deg, #F16001 0%, #E85002 55%, #D9C3AB 100%)",
    title: "Creator cut",
    tag: "Influencer Marketing",
    duration: "0:05",
    vertical: "influencer",
  },
];