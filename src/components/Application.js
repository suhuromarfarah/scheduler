import React, {useState, useEffect} from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment"
import { getAppointmentsForDay} from "helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const setDay = day => setState({...state, day});
  const appointments = getAppointmentsForDay(state, state.day).map(a => {
    return(
      <Appointment id={a.id} time={a.time} interview={a.interview} />
    )
  })
  useEffect(()=>{
    axios.get('http://localhost:8001/api/days')
      .then(response =>{
        console.log(response.data)
        Promise.all([
          Promise.resolve(axios.get("http://localhost:8001/api/days")),
          Promise.resolve(axios.get("http://localhost:8001/api/appointments"))
        ]).then((all) => {
          console.log(all[0]); // first
          console.log(all[1]); // second
          const [first, second] = all;
          console.log(first.data, second.data);

          setState(prev => ({ 
            ...prev,
            days: all[0].data, 
            appointments: all[1].data}));
        });
      })
  }, [])

  return (
    <main className="layout">
      <section className="sidebar">
        <img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        lt="Lighthouse Labs"/>
      </section>
      <section className="schedule">
        {appointments}
      </section>
    </main>
  );
}
