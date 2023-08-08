'use client'
import { useState } from 'react';

const useSong = (url: string) => {
  const [audio] = useState(new Audio(url));
  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => {
    audio.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audio.pause();
    setIsPlaying(false);
    };

  const stop = () => {
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
  };

  const setUrl = (url: string) => {
    audio.src = url;
    audio.play();
    setIsPlaying(true);
  };

  return { isPlaying, play, pause, setUrl, stop, audio };
};

export default useSong;