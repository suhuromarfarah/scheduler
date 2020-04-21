import React, {useState} from 'react'
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  const transition = (newMode, replace) => {
    setMode(newMode)
    setHistory(prev => {
      if(replace){
        let newArray = [...prev]
        newArray.pop()
        newArray.push(newMode)
        return newArray
        } else {
            return [...prev,newMode]
        }
    })
  }
  
  const back = () => {
    let previous = [...history]
    previous.pop()
    setHistory(previous)
    if(previous.length > 0){
      setMode(previous[previous.length-1])
    }
  }
  return { mode, transition, back };
}