"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { releases } from "./Music/releases";

export type PlayerTrack = {
  id: string;
  title: string;
  artwork: string;
  permalink: string;
  artist: string;
  index: number;
  total: number;
  duration: number;
  description: string;
  genre: string;
  publishedAt: string;
};

type PlayerContextValue = {
  playRequested: number;
  toggleRequested: number;
  requestedTrackIndex: number | null;
  isPlaying: boolean;
  isReady: boolean;
  currentTrack: PlayerTrack | null;
  tracks: PlayerTrack[];
  previewArtwork: string | null;
  requestPlay: () => void;
  togglePlayback: () => void;
  playTrack: (index: number) => void;
  setPlaying: (playing: boolean) => void;
  setReady: (ready: boolean) => void;
  setCurrentTrack: (track: PlayerTrack | null) => void;
  setTracks: (tracks: PlayerTrack[]) => void;
  setPreviewArtwork: (artwork: string | null) => void;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

const catalogTracks: PlayerTrack[] = [...releases]
  .sort((left, right) => left.playlistIndex - right.playlistIndex)
  .map((release) => ({
    id: `catalog-${release.id}`,
    title: release.title,
    artwork: release.cover,
    permalink: release.soundcloud,
    artist: release.artist,
    index: release.playlistIndex,
    total: releases.length,
    duration: 0,
    description: release.description,
    genre: release.genre,
    publishedAt: `${release.year}-01-01`,
  }));

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [playRequested, setPlayRequested] = useState(0);
  const [toggleRequested, setToggleRequested] = useState(0);
  const [requestedTrackIndex, setRequestedTrackIndex] = useState<number | null>(
    null,
  );
  const [isPlaying, setIsPlayingState] = useState(false);
  const [isReady, setReadyState] = useState(false);
  const [currentTrack, setCurrentTrackState] = useState<PlayerTrack | null>(
    null,
  );
  // Render the verified catalogue immediately. The SoundCloud widget replaces
  // these entries with live duration and metadata as soon as it is ready.
  const [tracks, setTracksState] = useState<PlayerTrack[]>(catalogTracks);
  const [previewArtwork, setPreviewArtworkState] = useState<string | null>(
    null,
  );

  const requestPlay = useCallback(() => {
    setRequestedTrackIndex(null);
    setPlayRequested((value) => value + 1);
  }, []);

  const togglePlayback = useCallback(() => {
    setToggleRequested((value) => value + 1);
  }, []);

  const playTrack = useCallback((index: number) => {
    setRequestedTrackIndex(index);
    setPlayRequested((value) => value + 1);
  }, []);

  const setPlaying = useCallback(
    (playing: boolean) => setIsPlayingState(playing),
    [],
  );
  const setReady = useCallback((ready: boolean) => setReadyState(ready), []);
  const setCurrentTrack = useCallback(
    (track: PlayerTrack | null) => setCurrentTrackState(track),
    [],
  );
  const setTracks = useCallback(
    (nextTracks: PlayerTrack[]) => setTracksState(nextTracks),
    [],
  );
  const setPreviewArtwork = useCallback(
    (artwork: string | null) => setPreviewArtworkState(artwork),
    [],
  );

  const value = useMemo(
    () => ({
      playRequested,
      toggleRequested,
      requestedTrackIndex,
      isPlaying,
      isReady,
      currentTrack,
      tracks,
      previewArtwork,
      requestPlay,
      togglePlayback,
      playTrack,
      setPlaying,
      setReady,
      setCurrentTrack,
      setTracks,
      setPreviewArtwork,
    }),
    [
      currentTrack,
      isPlaying,
      isReady,
      playRequested,
      previewArtwork,
      requestedTrackIndex,
      requestPlay,
      togglePlayback,
      toggleRequested,
      playTrack,
      setCurrentTrack,
      setPlaying,
      setReady,
      setTracks,
      setPreviewArtwork,
      tracks,
    ],
  );

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("usePlayer must be used inside PlayerProvider");
  return context;
}
