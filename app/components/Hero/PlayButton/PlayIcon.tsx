export default function PlayIcon({ isPlaying = false }: { isPlaying?: boolean }) {
  if (isPlaying) {
    return (
      <svg width="30" height="34" viewBox="0 0 34 38" fill="none" aria-hidden="true">
        <rect x="7" y="4" width="7" height="30" rx="2.5" fill="currentColor" />
        <rect x="20" y="4" width="7" height="30" rx="2.5" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg width="30" height="34" viewBox="0 0 34 38" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="translate-x-[2px]">
      <path d="M31 16.4019C33 17.5566 33 20.4434 31 21.5981L5.5 36.3205C3.5 37.4752 1 36.0318 1 33.7224V4.27757C1 1.96817 3.5 0.524793 5.5 1.67949L31 16.4019Z" fill="currentColor" />
    </svg>
  );
}
