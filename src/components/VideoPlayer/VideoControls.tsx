'use client';

import { useState, useEffect } from 'react';

interface VideoControlsProps {
 videoRef: React.RefObject<HTMLVideoElement>;
}

const VideoControls: React.FC<VideoControlsProps> = ({ videoRef }) => {
 const [isPlaying, setIsPlaying] = useState(false);
 const [currentTime, setCurrentTime] = useState(0);
 const [duration, setDuration] = useState(0);
 const [volume, setVolume] = useState(1);
 const [isDragging, setIsDragging] = useState(false);

 const formatTime = (seconds: number) => {
   const mins = Math.floor(seconds / 60);
   const secs = Math.floor(seconds % 60);
   return `${mins}:${secs.toString().padStart(2, '0')}`;
 };

 useEffect(() => {
   if (!videoRef.current) return;
   
   const video = videoRef.current;
   setDuration(video.duration);
   
   const timeUpdate = () => {
     if (!isDragging) {
       setCurrentTime(video.currentTime);
     }
   };

   video.addEventListener('timeupdate', timeUpdate);
   video.addEventListener('loadedmetadata', () => setDuration(video.duration));
   
   return () => {
     video.removeEventListener('timeupdate', timeUpdate);
     video.removeEventListener('loadedmetadata', () => setDuration(video.duration));
   };
 }, [videoRef, isDragging]);

 const togglePlay = () => {
   if (!videoRef.current) return;
   if (isPlaying) {
     videoRef.current.pause();
   } else {
     videoRef.current.play();
   }
   setIsPlaying(!isPlaying);
 };

 const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   const newTime = Number(e.target.value);
   if (videoRef.current) {
     videoRef.current.currentTime = newTime;
   }
   setCurrentTime(newTime);
 };

 const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   const newVolume = parseFloat(e.target.value);
   if (!videoRef.current) return;
   videoRef.current.volume = newVolume;
   setVolume(newVolume);
 };

 return (
   <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
     <div className="flex items-center gap-4 text-white">
       <button onClick={togglePlay} className="p-2 hover:bg-white/20 rounded">
         {isPlaying ? '⏸️' : '▶️'}
       </button>
       
       <div className="flex items-center gap-2 flex-grow">
         <span className="text-sm">{formatTime(currentTime)}</span>
         <input
           type="range"
           min="0"
           max={duration || 0}
           value={currentTime}
           onMouseDown={() => setIsDragging(true)}
           onMouseUp={() => setIsDragging(false)}
           onChange={handleTimeChange}
           className="flex-grow h-1"
         />
         <span className="text-sm">{formatTime(duration || 0)}</span>
       </div>
       
       <div className="flex items-center gap-2">
         <input
           type="range"
           min="0"
           max="1"  
           step="0.1"
           value={volume}
           onChange={handleVolumeChange}
           className="w-20 h-1"
         />
         <span className="text-sm w-8">{Math.round(volume * 100)}%</span>
       </div>
     </div>
   </div>
 );
};

export default VideoControls;