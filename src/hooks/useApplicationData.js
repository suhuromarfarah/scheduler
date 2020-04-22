import {useState, useEffect} from "react";
import axios from "axios";

export default function useApplicationData() {
   const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({...state, day});

  useEffect(()=>{
    Promise.all([
      Promise.resolve(axios.get("http://localhost:8002/api/days")),
      Promise.resolve(axios.get("http://localhost:8002/api/appointments")),
      Promise.resolve(axios.get("http://localhost:8002/api/interviewers")),
      ]).then(all => {
        setState(prev => ({ 
          ...prev,
          days: all[0].data, 
          appointments: all[1].data,
          interviewers: all[2].data}));
        });
      }, [])

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    const spotsAvailability = state.days.forEach(day => {
      if (day.name === state.day) {
        day.spots--;
      }
      return day;
    })
    
    return (axios.put(`http://localhost:8002/api/appointments/${id}`, appointment).then(setState({
      ...state,
      appointments
    })));
  };
  
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    const spotsAvailability = state.days.forEach(day => {
      if (day.name === state.day) {
        day.spots--;
      }
      return day;
    })
    
    return (axios.delete(`http://localhost:8002/api/appointments/${id}`, appointment).then(setState({
      ...state,
      appointments
    })));
  };
  return {cancelInterview, bookInterview, state, setDay}
}