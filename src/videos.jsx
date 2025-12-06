import { useRef, useState } from 'react'

function Videos() {
  const introRef = useRef(null);
  const loopRef = useRef(null);

  const [introDone, setIntroDone] = useState(false);

  const handleIntroEnd = () => {
    setIntroDone(true);
    loopRef.current?.play().catch(err => {
      console.log("Autoplay blocked:", err);
    });
  };

  return (
    <div>
      {/* INTRO VIDEO */}
      <video
        ref={introRef}
        className="w-screen h-screen absolute top-0 left-0 object-fill z-20"
        style={{
          visibility: introDone ? "hidden" : "visible" // hide instantly, no reflow
        }}
        muted
        autoPlay
        playsInline
        onEnded={handleIntroEnd}
      >
        <source src="intro.mp4" type="video/mp4" />
      </video>

      {/* LOOP VIDEO (always mounted) */}
      <video
        ref={loopRef}
        className="w-screen h-screen absolute top-0 left-0 object-fill z-10"
        style={{
          visibility: introDone ? "visible" : "hidden"
        }}
        muted
        loop
        playsInline
      >
        <source src="loop.mp4" type="video/mp4" />
      </video>
    </div>
  );
}

export default Videos;
