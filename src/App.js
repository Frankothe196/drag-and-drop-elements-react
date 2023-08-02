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
  // Step 1: Handle mouse hold, Mark/Select the item as dragged if held and mouse moved
  const [selected,setSelected] = useState()
  const [selectedData,setSelectedData] = useState()
  const timer = useRef()


  
  const handleMouseDown = (e)=>{
    // Mouse Down
    // On mouse down start a 1 second timer
    setSelected(e.target.id)
    // timer.current = setTimeout(() => {
    //   }, 1000
    // );
  }

  const handleMouseUp = ()=>{
    // On mouse up clear Interval
    if(selected&&selectedData){
      setSelected()
      setSelectedData()
    }
    clearTimeout(timer.current)
  }

  // Step 2: Add a place holder/empty space for the selected item and make a copy of the item (or its data)
  const Items = ({data,selected}) =>{
    const array = data?.map((item)=>{
      if(selected==item.id){
        setSelectedData(item)
      }
      return(
        <div className="item" id={item.id} onMouseDown={(e)=>handleMouseDown(e)} style={{opacity:`${selected&&selected==item.id?"0.8":"1"}`}}>
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

    if(data){
      return(<div ref={hoverRef} className="selectedDiv"><span>{data.text}</span></div>)
    }else{
      return ()=> document.removeEventListener(mouseHandler)
    }
  } 

  // Step 4: if mouse leaves container boundary cancel the whole operation
  // Done in main return

  // Step 5: On mouse release on a certain element, place the element to the left of that element, handle any shifting where necessary
  const handleMoveSelection = (e)=>{
    if(selected&&selectedData){
      setData(curr=>{
        let tempIndex
        let temp
        let arr
        arr = curr.map((item,i)=>{
          if(item.id==e.target.id){
            temp=item.text
            item.text=selectedData.text
          }
          if(item.id==selectedData.id){
            tempIndex=i
          }
          return(item)
        })
        arr[tempIndex].text=temp
        // console.log(arr)
        return(arr)
      })
      setSelected()
      setSelectedData()
    }
  }
  
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
        <section onMouseUp={(e)=>{handleMoveSelection(e)}} className={selected&&setSelectedData?"container moving":"container"}>
          <HoverWithMouse data={selectedData}/>
          <Items data={data} selected={selected}/>
        </section>
      </main>
    </div>
  );
}

export default App;
