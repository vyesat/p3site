import { useRef, useEffect } from 'react';

export default function Videos({ onStart, started }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const handleEnded = () => {
      // switch to loop and loop it
      v.src = '/loop.mp4';
      v.loop = true;
      v.play().catch(() => {});
    };

    v.addEventListener('ended', handleEnded);
    return () => v.removeEventListener('ended', handleEnded);
  }, []);

  const handleClickToPlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    // reveal the UI immediately
    if (onStart) onStart();
    try {
      await v.play();
    } catch (e) {
      console.warn('video play failed', e);
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        src="/intro.mp4"
        preload="auto"
        playsInline
        className="w-screen h-screen absolute top-0 left-0 object-cover z-0"
      />

      {!started && (
        <div
          className="intro-overlay"
          role="button"
          tabIndex={0}
          onClick={handleClickToPlay}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleClickToPlay();
          }}
          aria-label="Click to play intro"
        >
          <div className="intro-text">click to play</div>
        </div>
      )}
    </>
  );
}
