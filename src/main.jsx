import { createRoot } from 'react-dom/client'
import { Fragment, useRef, useState, useEffect } from 'react'
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
    click(); // play sound
    setIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };
  return (
    <div className='z-30 absolute bottom-10 right-10 text-center font-[fontsona] text-2xl text-shadow-lg'>
      <p  onClick={handleSongIndex} className='text-[15px] cursor-pointer'>click me to change song!</p>
      <h1 onClick={handleSongIndex} className="cursor-pointer">{songs[index].title}</h1>
      <h1 onClick={handleSongIndex} className="cursor-pointer">{songs[index].artist}</h1>
      <audio key={index} controls>
        <source src={songs[index].file} type="audio/mp3"/>
      </audio>
    </div>
  )
}
 
function List({ onItemClick }) {
  const [move] = useSound(uimov);
  const [click] = useSound(uiselectpage);

  const handleClick = (e) => {
    click(); // play sound
    onItemClick(); // show info box
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center z-30 font-[rodin] text-[8vh] tracking-[-0.15em] leading-[6.5vh] list">
      <h1 className='text-text-1 -rotate-15 z-30'>
          <i><a href="#" onMouseEnter={move} onClick={handleClick}>ABOUT ME</a></i>
      </h1>
      <h1 className='text-text-1 -rotate-8 z-30'>
          <i><a href="#" onMouseEnter={move} onClick={handleClick}>ITEM</a></i>
      </h1>
      <h1 className='text-text-2 -rotate-13 z-30'>
          <i><a href="#" onMouseEnter={move} onClick={handleClick}>EQUIP</a></i>
      </h1>
      <h1 className='text-text-2 -rotate-12 z-30'>
          <i><a href="#" onMouseEnter={move} onClick={handleClick}>PERSONA</a></i>
      </h1>
      <h1 className='text-text-3 rotate-2 z-30'>
          <i><a href="#" onMouseEnter={move} onClick={handleClick}>STATS</a></i>
      </h1>
      <h1 className='text-text-4 -rotate-10 z-30'>
          <i><a href="#" onMouseEnter={move} onClick={handleClick}>QUEST</a></i>
      </h1>
      <h1 className='text-text-4 -rotate-3 z-30'>
          <i><a href="#" onMouseEnter={move} onClick={handleClick}>SOCIAL LINK</a></i>
      </h1>
      <h1 className='text-text-5 -rotate-1 z-30'>
          <i><a href="#" onMouseEnter={move} onClick={handleClick}>CALENDAR</a></i>
      </h1>
      <h1 className='text-text-1 rotate-10 z-30'>
          <i><a href="#" onMouseEnter={move} onClick={handleClick}>SYSTEM</a></i>
      </h1>
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

  const handleImageClick1 = () => {
    click(); // play sound
    setIndex1((prevIndex) => (prevIndex + 1) % chars.length);
  };
  const handleImageClick2 = () => {
    click(); // play sound  
    setIndex2((prevIndex) => (prevIndex + 1) % chars.length);
  };
  const handleImageClick3 = () => {
    click(); // play sound
    setIndex3((prevIndex) => (prevIndex + 1) % chars.length);
  };
  const handleImageClick4 = () => {
    click(); // play sound
    setIndex4((prevIndex) => (prevIndex + 1) % chars.length);
  };

  return (
    <div className='z-50 absolute right-5 top-5 cursor-pointer h-36 space-y-2'>
      <img src={chars[index1]} onClick={handleImageClick1}/>
      <img src={chars[index2]} onClick={handleImageClick2}/>
      <img src={chars[index3]} onClick={handleImageClick3}/>
      <img src={chars[index4]} onClick={handleImageClick4}/>
    </div>
  )
}

function InfoBox({ onClose }) {
  const [close] = useSound(uiclose);
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    close(); // play sound
    setClosing(true);                   // start fade-out
    setTimeout(() => {
      onClose();                        // unmount AFTER animation
    }, 200); // match the animation duration
  };

  return (
    <div
      className={`absolute inset-0 flex min-h-screen z-40 items-center justify-center infobox ${closing ? "fade-out" : "fade-in"} cursor-pointer`}
      onClick={handleClose}
    >
      <img
        src="/info ui box.png"
        
      />
      <div className='absolute max-w-[30vw] max-h-[30vw] overflow-visible'>
        <h1 className=' text-white font-[fontsona] text-[2vh]'>Hello! I'm Myles. I coded this website because I was bored in class. I hope you like it!</h1>
      </div>
    </div>
  );
}

function Page() {
  const [infoVisible, setInfoVisible] = useState(false);

  const toggleInfoBox = () => setInfoVisible(prev => !prev);

  return (
    <>
      <Wallet />
      <Footer />
      
      <List onItemClick={toggleInfoBox} />
      {infoVisible && <InfoBox onClose={toggleInfoBox} />}
      <Videos />
      <MusicPlayer />
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <Page />
)