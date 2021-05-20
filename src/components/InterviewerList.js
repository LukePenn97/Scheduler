import React, { useState } from "react";
import "../styles/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem"
import PropTypes from 'prop-types'

export default function InterviewerList(props) {


  const {interviewer, setInterviewer} = useState(props.interviewer);
  const list = props.interviewers.map((interviewer) => {
    return <InterviewerListItem
      key={interviewer.id}
      id={interviewer.id}
      name={interviewer.name} 
      avatar={interviewer.avatar}
      setInterviewer={(event) => props.setInterviewer(interviewer.id)}
      selected={props.interviewer === interviewer.id}
      />
  })
   return (
    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">

      {list}

    </ul>
  </section>

   );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};