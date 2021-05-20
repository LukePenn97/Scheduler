import React, { Fragment } from 'react';
import './styles.scss'
import Header from './Header'
import Show from './Show'
import Empty from './Empty'
import Form from './Form'
import Status from './Status'
import Confirm from './Confirm'
import Error from './Error'
import useVisualMode from '../../hooks/useVisualMode'

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);


    props.bookInterview(props.id, interview)
      .then(()=>transition(SHOW))
      .catch((err)=>{

        transition(ERROR_SAVE, true)
        })
  }

  function Delete(id) {
    transition(DELETING);
    props.cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch((err)=>{

        transition(ERROR_DELETE, true)
        })
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header 
        time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={() => {

        transition(CREATE);
        }} />}
      {mode === SHOW && (
        <Show
          id={props.id}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={()=>transition(CONFIRM)}
          onEdit={()=>{
            transition(EDIT)
            }}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={()=>back()}
          onSave={save}
        />
      )}
      {mode === SAVING && (
        <Status
          message={"Saving..."}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          id={props.id}
          message={"Are you sure you would like to delete?"}
          onCancel={()=>back()}
          onConfirm={Delete}
        />
      )}
      {mode === DELETING && (
        <Status
          message={"Deleting..."}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={()=>back()}
          onSave={save}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={"Error on delete"}
          onClose={()=>{back();back()}}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message={"Error on save"}
          onClose={()=>{back();back()}}
        />
      )}
      
      {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty /> } */}
    </article>
  )
}