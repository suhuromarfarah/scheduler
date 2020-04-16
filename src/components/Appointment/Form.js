import React, { useState } from "react"
import Button from 'components/Button'
import InterviewerList from "components/InterviewerList"

export default function Form(props){
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [setError] = useState("");

  function reset() {
    setName("");
    setInterviewer(null);
  }

  // function validation(name,interviewer) {
  //   if (name === "") {
  //     setError("Student name can't be blank");
  //     return;
  //   }

  //   if (interviewer === null) {
  //     setError("An interviewer must be selected")
  //     return;
  //   }
    
  //   setError("");
  //   props.onSave(name, interviewer)
  //   }

  function cancel() {
    props.onCancel();
    reset();
  }

  return(
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event => event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          value={name}
          onChange={event => { 
            setName(event.target.value)}}
        />
      </form>
      <InterviewerList 
        interviewers={props.interviewers} 
        value={interviewer} 
        onChange={setInterviewer} 
        />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm onClick={() => {props.onSave(name, interviewer)}} >Save</Button>
      </section>
    </section>
    </main>
  );
}