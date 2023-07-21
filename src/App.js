import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import { hover } from '@testing-library/user-event/dist/hover';

function App() {

  // Data
  const defaultData = [
    {id:1, text:"Item 1"},
    {id:2, text:"Item 2"},
    {id:3, text:"Item 3"},
    {id:4, text:"Item 4"},
    {id:5, text:"Item 5"},
    {id:6, text:"Item 6"},
    {id:7, text:"Item 7"}, 
    {id:8, text:"Item 8"},
    {id:9, text:"Item 9"},
    {id:10, text:"Item 10"},
  ]
  const [data,setData] = useState(defaultData)

  // PseudoCode
  // We need to make an item draggable, while maintaining a great good user experience
  // Step 1: Handle mouse hold, Mark/Select the item as dragged if held for 1 second
  const [selected,setSelected] = useState()
  const [selectedData,setSelectedData] = useState()
  const timer = useRef()


  
  const handleMouseDown = (e)=>{
    // Mouse Down
    // console.log('mouse down')
    // On mouse down start a 1 second timer
    timer.current = setTimeout(() => {
        console.log(`Selected item id: ${e.target.id}`)
        setSelected(e.target.id)
      }, 1000
    );
  }

  const handleMouseUp = ()=>{
    // console.log('mouse up')
    // On mouse up clear Interval
    setSelected()
    setSelectedData()
    clearTimeout(timer.current)
  }

  // Step 2: Add a place holder/empty space for the selected item and make a copy of the item (or its data)
  const Items = ({data,selected}) =>{
    const array =data?.map((item)=>{
      if(selected==item.id){
        setSelectedData(item)
      }
      return(
        <div id={item.id} onMouseDown={(e)=>handleMouseDown(e)} onMouseUp={()=>{handleMouseUp()}} style={{opacity:`${selected&&selected==item.id?"0.8":"1"}`}}>
          <span>{selected&&selected==item.id?"":item.text}</span>
        </div>
      )
    })
    return array
  }

  // Step 3: Make the item hover with the mouse movement
  const HoverWithMouse = ({data})=>{
    let hoverRef = useRef()
    
    const mouseHandler = document.addEventListener('mousemove',function(e){
      if(hoverRef.current){
        hoverRef.current.style.top=`${e.clientY-30}px`
        hoverRef.current.style.left=`${e.clientX-30}px`
        hoverRef.current.style.opacity='1'
      }
    })
    let style = {position: 'fixed', zIndex:2, height: "180px", width: "180px",opacity:"0"}
    if(data){
      return(<div ref={hoverRef} style={style} onMouseUp={()=>handleMouseUp()}>{data.text}</div>)
    }
    else{
      return ()=> document.removeEventListener(mouseHandler)
    }
  } 

  // Step 4: if mouse leaves container boundary cancel the whole operation
  
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
      <main onMouseLeave={()=>{handleMouseUp()}}>
        <section className="container">
          <HoverWithMouse data={selectedData}/>
          <Items data={data} selected={selected}/>
        </section>
      </main>
    </div>
  );
}

export default App;
