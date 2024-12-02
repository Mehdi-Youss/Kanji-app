import { useEffect, useState } from 'react'
import Input from './components/Input'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import Details from './components/Details'

function App() {
  const [data, setData] = useState(null)
  const [showSidebar, setshowSidebar] = useState(false)
  const [isBigScreen, setIsBigScreen] = useState(window.innerWidth > 1024);

  // Update the state when the screen size changes
  useEffect(() => {
    const handleResize = () => setIsBigScreen(window.innerWidth > 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get the current day
  const currentDay = new Date().getDay();

  // Define the images 
  const images = {
    0: { small: '/assets/background-images/cherrybloss-small.jpg', big: '/assets/background-images/cherrybloss-big.jpg'},
    1: { small: '/assets/background-images/geisha-small.jpg', big: '/assets/background-images/geisha-big.jpg'},
    2: { small: '/assets/background-images/japanautumn-small.jpg', big: '/assets/background-images/japanautumn-big.jpg'},
    3: { small: '/assets/background-images/kiyomizu-small.jpg', big: '/assets/background-images/kiyomizu-big.jpg'},
    4: { small: '/assets/background-images/koyasan-small.jpg', big: '/assets/background-images/koyasan-big.jpg'},
    5: { small: '/assets/background-images/sangenjaya-small.jpg', big: '/assets/background-images/sangenjaya-big.jpg'},
    6: { small: '/assets/background-images/tori-small.jpg', big: '/assets/background-images/tori-big.jpg'}
  };

  // Choose the image by the size
  const backgroundImage = isBigScreen ? images[currentDay].big : images[currentDay].small;

  function handleToggleSidebar() {
    setshowSidebar(!showSidebar)
  } 

  useEffect(() => {
    const storedKanji = JSON.parse(localStorage.getItem('dailyKanji'));
    const storedDate = localStorage.getItem('kanjiDate');
    const today = new Date().toDateString(); // Ensure format consistency

    if (storedKanji && storedDate === today) {
      setData(storedKanji);
      console.log('Stored Kanji:', storedKanji); // to show the current values
    } else {
      async function fetchAPIData() {
          const url = 'https://kanjialive-api.p.rapidapi.com/api/public/kanji/all';
          const options = {
              method: 'GET',
              headers: {
                  'x-rapidapi-key': import.meta.env.VITE_KANJI_API_KEY,
                  'x-rapidapi-host': 'kanjialive-api.p.rapidapi.com'
              }
          };

          try {
              const response = await fetch(url, options);
              const result = await response.json();
              const randomKanji = result[Math.floor(Math.random() * result.length)];
              setData(randomKanji); //Stocker les données
              console.log('Fetched Kanji', randomKanji); 
              localStorage.setItem('dailyKanji', JSON.stringify(randomKanji));
              localStorage.setItem('kanjiDate', today);
          } catch (error) {
              console.error('loading error', error);
          }
      }
      fetchAPIData();
    }
  }, []);

  
  return (
    <>
      <div 
        className='backgroundBlur'
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1,
        }}
        ></div>
      {data ? (<Input data={data}/>) : (
        <div className='loadingState'>
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      <Details showSidebar={showSidebar} handleToggleSidebar={handleToggleSidebar}/>
      {showSidebar && (
        <Sidebar data={data} handleToggleSidebar={handleToggleSidebar} />
      )}
      <Footer/>
    </>
  )
}

export default App
