import logo from './logo.svg';
import './App.css';
import { useRef, useState } from 'react';

function App() {

  // PseudoCode
  // We need to make an item draggable, while maintaining a great good user experience
  // Step 1: Handle mouse hold, Mark/Select the item as dragged if held for 1 second
  const [selected,setSelected] = useState()
  const timer = useRef()


  
  const handleMouseDown = (e)=>{
    // On mouse down start a 1 second timer
    timer.current = setTimeout(() => {
        console.log(`Selected item ${e.target.id}`)
        setSelected(e.target.id)
    }, 1000
    );
  }

  const handleMouseUp = ()=>{
    console.log('mouse up')
    // On mouse up clear Interval
    clearTimeout(timer.current)
  }

  // Step 2: Add a place holder/empty space for the item and make a copy of the item (or its data).
  // Step 3: Make the item hover with the mouse movement
  // Step 4: if mouse leaves boundary cancel the whole operation
  // Step 5: On mouse release on a certain element, place the element to the left of that element, handle any shifting where necessary
  
  // NB: Is it better to actually move the whole element or just move its data?

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Drag and Drop Elements in React.js
        </p>
      </header>
      <main>
        <section className="container">
          <div id={1} onMouseDown={(e)=>handleMouseDown(e)} onMouseUp={()=>{handleMouseUp()}}><span>Item 1</span></div>
          <div><span>Item 2</span></div>
          <div><span>Item 3</span></div>
          <div><span>Item 4</span></div>
          <div><span>Item 5</span></div>
          <div><span>Item 6</span></div>
          <div><span>Item 7</span></div>
          <div><span>Item 8</span></div>
          <div><span>Item 9</span></div>
          <div><span>Item 10</span></div>
        </section>
      </main>
    </div>
  );
}

export default App;
