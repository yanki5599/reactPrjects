import React, { useEffect, useRef, useState } from "react";

const Video: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    isPlaying ? videoRef.current?.play() : videoRef.current?.pause();
  }, [isPlaying]);

  function forward() {
    if (!videoRef.current) return;
    videoRef.current.currentTime += 30;
  }
  function rewind() {
    if (!videoRef.current) return;
    videoRef.current.currentTime -= 30;
  }

  return (
    <div>
      <video
        autoPlay
        ref={videoRef}
        width="320"
        height="240"
        controls
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      ></video>
      <div>
        <button onClick={rewind}>⏪</button>
        <button onClick={() => setIsPlaying((prev) => !prev)}>
          {isPlaying ? "⏸️" : "▶️"}
        </button>
        <button onClick={forward}>⏩</button>
      </div>
    </div>
  );
};

export default Video;
