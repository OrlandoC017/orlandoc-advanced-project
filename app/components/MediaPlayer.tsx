"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  SkipBack,
  SkipForward,
} from "lucide-react";
import "./MediaPlayer.css";

interface MediaPlayerProps {
  audioLink: string;
  title: string;
  author: string;
  imageLink: string;
}

export default function MediaPlayer({ audioLink, title, author, imageLink }: MediaPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleSkipBack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, currentTime - 15);
    }
  };

  const handleSkipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(duration, currentTime + 15);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, []);

  return (
    <div className="media-player">
      <audio
        ref={audioRef}
        src={audioLink}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="media-player__container">
        <div className="media-player__info">
          <img src={imageLink} alt={title} className="media-player__image" />
          <div className="media-player__text">
            <p className="media-player__title">{title}</p>
            <p className="media-player__author">{author}</p>
          </div>
        </div>

        <div className="media-player__controls">
          <button
            className="media-player__btn"
            onClick={handleSkipBack}
            title="Skip back 15 seconds"
          >
            <SkipBack size={20} />
          </button>

          <button
            className="media-player__btn media-player__play-btn"
            onClick={handlePlayPause}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>

          <button
            className="media-player__btn"
            onClick={handleSkipForward}
            title="Skip forward 15 seconds"
          >
            <SkipForward size={20} />
          </button>
        </div>

        <div className="media-player__progress-section">
          <span className="media-player__time">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleProgressChange}
            className="media-player__progress"
          />
          <span className="media-player__time">{formatTime(duration)}</span>
        </div>

        <div className="media-player__volume-section">
          <Volume2 size={20} />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="media-player__volume"
          />
        </div>
      </div>
    </div>
  );
}
