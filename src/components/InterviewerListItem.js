import React from "react";
import classNames from "classnames"
import "../styles/InterviewerListItem.scss"

export default function InterviewerListItem(props) {
  const interviewerClass = classNames({
    "interviewers__item": true,
    "interviewers__item--selected": props.selected
  })
  return (
    <li className={interviewerClass} >
      <img
        onClick={props.setInterviewer}
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
        
      />
      
      {props.selected ? props.name : ''}
    </li>
  )
}