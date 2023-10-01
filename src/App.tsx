import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [ data, setData ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const spanRef: MutableRefObject<HTMLSpanElement | null> = useRef(null);
  let index = 0;
  const url = "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/637261";

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch(url);
    const data = await res.text();
    setData(data);
    setLoading(false);
  };

  const typeEffect = () => {
    const delay = 500;

    if(spanRef.current !== null){
      const addedCharacter = data.substring(0, index + 1);
      spanRef.current.innerText = `${addedCharacter}`;
      index += 1;
    }
    if(index < data.length){
      setTimeout(typeEffect, delay);
    }
  }

  useEffect(() => {
    fetchData();
    if(data && spanRef.current !== null){
      typeEffect();
    }
  }, [data])

  if(loading){
    return <h2>Loading...</h2>
  }
  return (
    <div className="App">
      <h1>Welcome To Ramp Task</h1>
      <span ref={spanRef} className='txt'></span>
    </div>
  );
}

export default App;
