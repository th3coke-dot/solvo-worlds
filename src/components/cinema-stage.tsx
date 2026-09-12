import { useEffect, useRef, useState } from "react";
import type { Shot } from "@/lib/worlds";

type CinemaStageProps = {
  frames: Shot[];
  opacities: number[];
  playing: boolean;
  useVideo: boolean;
  kenBurns: boolean;
  showVeil?: boolean;
};

function useIsWide() {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setWide(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return wide;
}

export function CinemaStage({
  frames,
  opacities,
  playing,
  useVideo,
  kenBurns,
  showVeil = false,
}: CinemaStageProps) {
  const wide = useIsWide();
  return (
    <div className="cinema-stage">
      {frames.map((shot, i) => (
        <FrameLayer
          key={`${shot.portrait}-${shot.wide}-${i}`}
          shot={shot}
          opacity={opacities[i] ?? 0}
          playing={playing}
          useVideo={useVideo}
          kenBurns={kenBurns}
          wide={wide}
        />
      ))}
      {showVeil ? (
        <>
          <div className="cinema-vignette" />
          <div className="cinema-grain" />
        </>
      ) : null}
    </div>
  );
}

function FrameLayer({
  shot,
  opacity,
  playing,
  useVideo,
  kenBurns,
  wide,
}: {
  shot: Shot;
  opacity: number;
  playing: boolean;
  useVideo: boolean;
  kenBurns: boolean;
  wide: boolean;
}) {
  const visible = opacity > 0.02;
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = wide ? shot.videoWide : shot.videoPortrait;
  const showVideo = Boolean(useVideo && videoSrc && visible);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !showVideo) return;
    if (playing && visible) {
      const play = el.play();
      if (play) void play.catch(() => {});
    } else {
      el.pause();
    }
  }, [playing, visible, showVideo, videoSrc]);

  return (
    <div className="cinema-frame" style={{ opacity }}>
      <picture>
        <source media="(min-width: 768px)" srcSet={shot.wide} />
        <img
          src={shot.portrait}
          alt=""
          className={kenBurns && !showVideo ? "cinema-media cinema-ken" : "cinema-media"}
          style={{ objectPosition: shot.objectPosition ?? "center center" }}
          draggable={false}
        />
      </picture>
      {showVideo ? (
        <video
          ref={videoRef}
          className="cinema-media"
          style={{ objectPosition: shot.objectPosition ?? "center center" }}
          src={videoSrc}
          muted
          loop
          playsInline
          preload="auto"
        />
      ) : null}
    </div>
  );
}
