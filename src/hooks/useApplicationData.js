import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ReactDOM from "react-dom";


export default function useApplicationData() {
  const [state, setState] = useState(
  {
    day: {name: 'Monday', spots: 0},
    days: [],
    interviewers: {},
    appointments: {}
  });

  function updateSpots(dayName, inc) {
    const navBarSpots = document.getElementById(`${dayName}`);

    let spotString = navBarSpots.innerText;

    const dayObj = state.days.find(day => day.name === dayName);

    let dayId = dayObj.id;
    const stateDays = [...state.days];

    let newSpots = stateDays[dayId-1].spots + inc;

    
    state.day.spots = newSpots;

    stateDays[dayId-1].spots = newSpots;

    return stateDays;
    //ReactDOM.render(updatedSpotString,navBarSpots)
  }

  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


    const days = updateSpots(state.day.name, -1);
    setState({...state, appointments, days});
    
    const url = `/api/appointments/${id}`
    return axios.put(url, {interview})
      .then((body) => {

      })
  }

  function cancelInterview(id) {
    const url = `/api/appointments/${id}`

    const days = updateSpots(state.day.name, 1);
    setState({...state, days});
    return axios.delete(url, null)
      .then((body) => {
        
      })
  }

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
        
    ]).then(all => {
          setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
          
        })
  },[])

  const setDay = dayName => { 
    return setState({ ...state, day: {name: dayName, spots: state.day.spots}})
  };

  return {state, setDay, bookInterview, cancelInterview};
}