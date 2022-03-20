import { useEffect } from "react";
import $ from 'jquery';
import '../styles/calendar.css'
import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import { useState } from 'react'


/*
<div id="calendar">
          <FullCalendar
            plugins={[ dayGridPlugin, interactionPlugin ]}
            initialView="dayGridMonth"
            selectable={true}
            dateClick= {function(info) {
            }}
            weekends={true}
            events={[
            ]}
          />
        </div> 
*/

const Calendar = ({ setShowCalendarWindow, calendarParkingId, domain }) => {


  var selectedTime = {
    start: null,
    end: null
  };

  const [trigger, setTrigger] = useState(false);

  const [reservedEvent, setReservedEvent] = useState([{
    start: 0,
    end: 0,
    backgroundColor: 'rgb(168, 60, 50)',
    color: 'rgb(168, 60, 50)',
    textColor: 'rgb(168, 60, 50)',
    title: 'zauzeto'
  }]);

  const [timeStamps, setTimeStamps] = useState({ startTime: "00:00", endTime: "01:00" });
  const [repeatVariables, setRepeatVariables] = useState({ repeatDaily: false, repeatWeekly: false });

  const handleChange = (event) => {

    const name = event.target.id;

    if (name === 'norepeat') {
      setRepeatVariables(({ repeatDaily: 'false', repeatWeekly: 'false' }));
    } else if (name === 'repeatDaily') {
      setRepeatVariables(({ repeatDaily: 'true', repeatWeekly: 'false' }));
    } else if (name === 'repeatWeekly') {
      setRepeatVariables(({ repeatDaily: 'false', repeatWeekly: 'true' }));
    }
  }

  $(document).on("keydown", function (e) {
    if (e.keyCode === 27) {
      if ($('#popupClientInfo').css('display') === undefined)
        $('#button-container-holder').show();
      setShowCalendarWindow(false);
    }
  });


  var fetchParkingReservations = async function () {
    console.log(calendarParkingId);
    try {
      const formData = new FormData();
      formData.append('id', calendarParkingId);

      console.log(calendarParkingId)
      //f3rovci-parkshare.herokuapp.com
      const response = await fetch(`${domain}api/parking/availableParkingSpaces`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: formData
      });

      //console.log(response.status);

      if (!response.ok) {
        throw Error('Could not fetch data');
      }
      else {
        const parkingSpaceReservations = await response.json();
        console.log(parkingSpaceReservations);

        for (let i = 0; i < parkingSpaceReservations.length; i++) {
          setReservedEvent(reservedEvent => ([...reservedEvent, {
            start: parkingSpaceReservations[i].startTime,
            end: parkingSpaceReservations[i].endTime,
            backgroundColor: 'rgb(168, 60, 50)',
            color: 'rgb(168, 60, 50)',
            textColor: 'rgb(168, 60, 50)',
            title: 'zauzeto'
          }]));
        }

      }

    } catch (err) {

    }
  }

  let reserve = async function () {

    /* const bookParking = {
       startTime: timeStamps.startTime,
       endTime: timeStamps.endTime,
       parkingSpaceId: calendarParkingId,
       username: localStorage.getItem('username'),
       repeatDaily: repeatVariables.repeatDaily === 'true',
       repeatWeekly: repeatVariables.repeatWeekly === 'true',
     }*/

    console.log(repeatVariables)
    try {
      //const formData = new FormData();
      //formData.append('id', calendarParkingId);

      const bookParking = {
        startTime: timeStamps.startTime,
        endTime: timeStamps.endTime,
        parkingSpaceId: calendarParkingId,
        username: localStorage.getItem('username'),
        repeatDaily: repeatVariables.repeatDaily === 'true',
        repeatWeekly: repeatVariables.repeatWeekly === 'true',
      }

      let notReservable = false;

      //console.log(bookParking)

      for (let i = 1; i < reservedEvent.length; i++) {
        //console.log(reservedEvent[i])

        if (!(((reservedEvent[i].start < bookParking.startTime) && (reservedEvent[i].start <= bookParking.endTime)) || ((reservedEvent[i].end >= bookParking.startTime) && (reservedEvent[i].end > bookParking.endTime)))) {
          notReservable = true;
        }
      }

      if (bookParking.startTime === "00:00" || notReservable) {
        alert("Unsuccessful reservation. Already reserved.")
        return;
      }

      console.log(JSON.stringify(bookParking))
      //f3rovci-parkshare.herokuapp.com
      const response = await fetch(`${domain}api/parking/reservation`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookParking)
      });

      //console.log(response);
      const canReserve = await response.text();
      //console.log(canReserve)

      if (response.status === 409) {

        //const canReserve = await response.text();
        alert(canReserve)
      } else if (!response.ok) {
        throw Error('Could not fetch data');
      }
      else {

        //const canReserve = await response.json();
        //console.log(canReserve)
        setTrigger(!trigger)
        //setShowCalendarWindow(false);
        //const data = await response.json();
      }

    } catch (err) {

    }
  }

  useEffect(() => {
    setReservedEvent([{
      start: 0,
      end: 0,
      backgroundColor: 'rgb(168, 60, 50)',
      color: 'rgb(168, 60, 50)',
      textColor: 'rgb(168, 60, 50)',
      title: 'zauzeto'
    }]);
    fetchParkingReservations();
  }, [trigger]);


  /*var bookParking = function () {
    console.log(calendarParkingId);
    //console.log(startTime);
    //console.log(endTime);
  }*/

  return (
    <div id='popupCalendar' className="popupDark">
      <div id='background'>
        <p></p>
        <div id="calendarDay">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            allDaySlot={false}

            initialView='timeGridDay'
            weekends={true}
            timeZone="UTC"
            events={reservedEvent}
            //true
            selectable={true}
            expandRows={true}
            select={function (selectionInfo) {

              /*
              if (selectionInfo.start >= Date.now()) {
                selectedTime.start = selectionInfo.start;
                selectedTime.end = selectionInfo.end;

                setTimeStamps(timeStamps => ({ ...timeStamps, startTime: selectionInfo.startStr, endTime: selectionInfo.endStr }));
              } else {
                alert('Can\'t reserve in past')
              }
              */

              setTimeStamps(timeStamps => ({ ...timeStamps, startTime: selectionInfo.startStr, endTime: selectionInfo.endStr }));
              //alert(selectionInfo.start + " " + selectedTime.end);
            }}
          />
        </div>
        <p></p>

        <button id="button" type="button" onClick={reserve}>Book</button>
        <form action="">
          <input type="radio" id="repeatDaily" name="repeat" onChange={handleChange} />
          <label htmlFor="html">repeat daily</label><br />
          <input type="radio" id="repeatWeekly" name="repeat" onChange={handleChange} />
          <label htmlFor="css">repeat weekly</label><br />
          <input type="radio" id="norepeat" name="repeat" value="false" onChange={handleChange} defaultChecked />
          <label htmlFor="css">no repeat</label>
        </form>


      </div>
    </div>
  )
}

export default Calendar;