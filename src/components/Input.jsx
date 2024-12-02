import React from 'react'

export default function Input(props) {
  const {data} = props;

  //Check if the data are availables
  if (!data || !data.kanji) {
    return <p>No Kanji available.</p>;
  }

  return (
    <div className='kanjiContainer'>
      <h1>Kanji of the day !</h1>
      <div className='mainContent'>
        <span className='kanji'>{data.kanji.character}</span>
        <p className='meaning'>Meaning:&nbsp; {data.kanji.meaning.english}</p>
        <div className='reading'>
          <p className='kunyomi'>Kunyomi: {data.kanji.kunyomi.hiragana}</p>
          <p className='onyomi'>Onyomi: {data.kanji.onyomi.katakana}</p>
        </div>
      </div>
    </div>
  );
}
