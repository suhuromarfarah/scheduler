import React, {useState, useEffect} from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "components/DayList"
import Appointment from "components/Appointment"
import { getAppointmentsForDay, getInterview, getInterviewsForDay} from "helpers/selectors";


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({...state, day});

  useEffect(()=>{
    Promise.all([
      axios.get("http://localhost:8002/api/days"),
      axios.get("http://localhost:8002/api/appointments"),
      axios.get("http://localhost:8002/api/interviewers"),
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
    
    return (axios.delete(`http://localhost:8002/api/appointments/${id}`, appointment).then(setState({
      ...state,
      appointments
    })));
  };


  const appointments = getAppointmentsForDay(state, state.day);
  const schedule = appointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewsForDay(state, state.day)

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        />
      );
    });
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
          {schedule}
        </section>
      </main>
    );
    }
