'use client';

import { useRef, useEffect } from 'react';
import Hls from 'hls.js';
import VideoControls from './VideoControls';

interface VideoPlayerProps {
  src: string;
  type?: 'hls' | 'dash' | 'normal';
  poster?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, type = 'normal', poster }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    if (type === 'hls' && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);
    }
  }, [src, type]);

  return (
    <div className="relative w-full aspect-video">
      <video
        ref={videoRef}
        className="w-full h-full"
        poster={poster}
        playsInline
      >
        <source src={src} type={type === 'normal' ? 'video/mp4' : undefined} />
      </video>
      
      <VideoControls videoRef={videoRef} />
    </div>
  );
};

export default VideoPlayer;
