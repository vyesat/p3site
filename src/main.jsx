import { createRoot } from 'react-dom/client'
import { useRef, useState } from 'react'
import './index.css'
import Videos from './videos.jsx'
import useSound from 'use-sound';
import uimov from '/uimove.wav';
import uiselect from '/uiselect.wav';
import uiselectpage from '/uiselectpage.wav';
import uiclose from '/uiclose.wav';

function Wallet() {
  return (
    <div className='border-2 border-black bg-white absolute top-20 left-45 z-30 overflow-hidden w-75 h-30 text-black text-left p-5 font-[fontsona]'>
      <p className='text-4xl'><i>¥</i> 230,209</p>
      <i><p className='text-1xl'>current wallet</p></i>
    </div>  
  )
}

function MusicPlayer() {
  const songs = [ 
    {title: 'Full Moon, Full Life', artist: "Azumi Takahashi", file: 'fmfl.mp3'}, 
    {title: 'Iwatodai Dorm', artist: "Lotus Juice", file: 'id.flac'},
    {title: 'Mass Destruction', artist: "Lotus Juice", file: 'md.flac'}
  ];
  const [click] = useSound(uiselect);
  const [index, setIndex] = useState(0);

  const handleSongIndex = () => {
    click();
    setIndex((prev) => (prev + 1) % songs.length);
  };

  return (
    <div className='z-30 absolute bottom-10 right-10 text-center font-[fontsona] text-2xl text-shadow-lg'>
      <p onClick={handleSongIndex} className='text-[15px] cursor-pointer'>click to change song</p>
      <h1 onClick={handleSongIndex} className="cursor-pointer">{songs[index].title}</h1>
      <h1 onClick={handleSongIndex} className="cursor-pointer">{songs[index].artist}</h1>
      <audio key={index} controls>
        <source src={songs[index].file} type="audio/mp3"/>
      </audio>
    </div>
  )
}

function Footer() {
  const chars = ['makoto.png', 'aigis.png', 'yukari.png', 'junpei.png', 'koromaru.png', 'ken.png', 'mitsuru.png', 'akihiko.png', 'shinji.png'];
  const [click] = useSound(uiselect);

  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(1);
  const [index3, setIndex3] = useState(2);
  const [index4, setIndex4] = useState(3);

  const handleImageClick = (setter) => {
    click();
    setter((prev) => (prev + 1) % chars.length);
  };

  return (
    <div className='z-50 absolute right-5 top-5 cursor-pointer h-36 space-y-2'>
      <img src={chars[index1]} onClick={() => handleImageClick(setIndex1)} />
      <img src={chars[index2]} onClick={() => handleImageClick(setIndex2)} />
      <img src={chars[index3]} onClick={() => handleImageClick(setIndex3)} />
      <img src={chars[index4]} onClick={() => handleImageClick(setIndex4)} />
    </div>
  )
}

function InfoBox({ text, onClose }) {
  const [close] = useSound(uiclose);
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    close();
    setClosing(true);
    setTimeout(() => onClose(), 200);
  };

  return (
    <div
      className={`absolute inset-0 flex min-h-screen z-40 items-center justify-center infobox ${closing ? "fade-out" : "fade-in"} cursor-pointer`}
      onClick={handleClose}
    >
      <img src="/p3site/infouibox.png" />
      <div className='absolute max-w-[30vw] max-h-[30vw] overflow-visible'>
        <h1 className='text-white font-[fontsona] text-[2vh]'>{text}</h1>
      </div>
    </div>
  );
}

function List() {
  const [move] = useSound(uimov);
  const [click] = useSound(uiselectpage);

  const headers = [
    { label: "M1NIMOE", type: "none", className: "text-text-1 -rotate-15 z-30" },
    { label: "ABOUT ME", type: "infobox", text: "hi im m1nimoe", className: "text-text-1 -rotate-8 z-30" },
    { label: "DISCORD", type: "link", url: "https://discordapp.com/users/640262833703223306", className: "text-text-2 -rotate-13 z-30" },
    { label: "SPOTIFY", type: "link", url: "https://open.spotify.com/user/31l7vc724ljbrpq5nc4cni6jhuea?si=54da1213183d4993", className: "text-text-2 -rotate-12 z-30" },
    { label: "TIKTOK", type: "link", url: "https://www.tiktok.com/@m1nimoe", className: "text-text-3 rotate-2 z-30" },
    { label: "STEAM", type: "link", url: "https://steamcommunity.com/profiles/76561199663342332/", className: "text-text-4 -rotate-10 z-30" },
    { label: "ROBLOX", type: "link", url: "https://www.roblox.com/users/1463554151", className: "text-text-4 -rotate-3 z-30" },
    { label: "WEBSITE", type: "infobox", text: "website made by esat", className: "text-text-5 -rotate-1 z-30" },
    { label: "CREDITS", type: "infobox", text: "credits to @mylesXD on github for most of the code and assets", className: "text-text-1 rotate-10 z-30" },
  ];

  const [infoVisible, setInfoVisible] = useState(false);
  const [infoText, setInfoText] = useState("");

  const handleClick = (header) => {
    click();
    if (header.type === "infobox") {
      setInfoText(header.text);
      setInfoVisible(true);
    } else if (header.type === "link") {
      // opens in same tab
      window.location.href = header.url;
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen justify-center items-center z-30 font-[rodin] text-[8vh] tracking-[-0.15em] leading-[6.5vh] list">
        {headers.map((h, idx) => (
          <h1 key={idx} className={h.className}>
            <i>
              <a
                href="#"
                onMouseEnter={move}
                onClick={(e) => { e.preventDefault(); handleClick(h); }}
              >
                {h.label}
              </a>
            </i>
          </h1>
        ))}
      </div>

      {infoVisible && (
        <InfoBox
          text={infoText}
          onClose={() => setInfoVisible(false)}
        />
      )}
    </>
  );
}

function Page() {
  return (
    <>
      <Wallet />
      <Footer />
      <List />
      <Videos />
      <MusicPlayer />
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <Page />
)
