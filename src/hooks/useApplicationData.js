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
  
  const updateSpots = (day, appointments) => 
    day.appointments.length - 
    day.appointments.reduce(
      (count, id) => (appointments[id].interview ? count + 1: count), 0
    );

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
    const days = state.days.map(day => {
      if (day.appointments.includes(id)) {
        return {...day, spots: updateSpots(day, appointments)}
      }
      return day;
    })
    
    return (axios.put(`http://localhost:8002/api/appointments/${id}`, appointment).then(() => { setState({
      ...state,
      appointments,
      days
    });
  }));
}
  
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    const days = state.days.map(day => {
      if (day.appointments.includes(id)) {
        return {...day, spots: updateSpots(day, appointments)}
      }
      return day;
    })
    
    return (axios.delete(`http://localhost:8002/api/appointments/${id}`, appointment).then(setState({
      ...state,
      appointments,
      days
    })));
  };
  return {cancelInterview, bookInterview, state, setDay}
}