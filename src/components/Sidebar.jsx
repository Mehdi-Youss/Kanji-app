import React from 'react'

export default function Sidebar(props) {
  const {data, handleToggleSidebar} = props;

  return (
    <div className='sideBar' onClick={handleToggleSidebar}>
      <div className='bgOverlay'></div>
      <div className='sideBarContents'>
        {data && data.examples ? (
          data.examples.map((example, index) => (
            <div key={index} className='example'>
              <p>Japanese: {example.japanese}</p>
              <p>Meaning: {example.meaning.english}</p>
              <p>Audio:</p>
              <audio controls>
                <source src={example.audio.mp3} type='audio/ogg'/>
                <source src={example.audio.mp3} type='audio/aac'/>
                <source src={example.audio.mp3} type='audio/mp3'/>
                Your browser does not support the audio element.
              </audio>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
