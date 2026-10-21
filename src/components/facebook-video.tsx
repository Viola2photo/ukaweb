import { Play } from "lucide-react";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

type Props = {
  url: string;
  cover: string;
  coverAlt: string;
  title: string;
  where: string;
};

// Shows the cover first and loads the Facebook player only after a tap, so visitors who
// never press play are not sent to Facebook's embed or tracking scripts.
export function FacebookVideo({ url, cover, coverAlt, title, where }: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="fb-video">
      {playing ? (
        <iframe
          title={title}
          src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=360`}
          className="store-video"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <>
          <img className="fb-cover" src={cover} alt={coverAlt} loading="lazy" />
          <button
            type="button"
            className="store-play"
            onClick={() => {
              setPlaying(true);
              trackEvent("play_store_video", { location: where });
            }}
          >
            <Play size={20} aria-hidden="true" />
            播放介紹影片
          </button>
        </>
      )}
      <a className="store-video-link" href={url} target="_blank" rel="noreferrer">
        在 Facebook 觀看影片
      </a>
    </div>
  );
}
