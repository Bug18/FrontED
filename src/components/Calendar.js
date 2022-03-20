import { useEffect } from "react";
import $ from 'jquery';
import './css_components/calendar.css'
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

const Calendar = ({ setShowCalendarWindow, calendarRoomId }) => {


	let selectedTime = {
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
		title: 'Reserved'
	}]);

	const [timeStamps, setTimeStamps] = useState({ startTime: "00:00", endTime: "01:00" });
	//const [repeatVariables, setRepeatVariables] = useState({ repeatDaily: false, repeatWeekly: false });


	$(document).on("keydown", function (e) {
		if (e.keyCode === 27) {
			if ($('#popupClientInfo').css('display') === undefined)
				$('#button-container-holder').show();
			setShowCalendarWindow(false);
		}
	});

	var fetchRoomReservations = async function () {
		console.log(calendarRoomId);
		try {
			const formData = new FormData();
			formData.append('id', calendarRoomId);

			console.log(calendarRoomId);
			//nesto.com
			const response = await fetch(`http://10.10.30.10:9000/api/roomReservations/availableRoomSpaces`, {
				method: 'POST',
				headers: {
					'Authorization': {'username': sessionStorage.getItem('username'), "password": sessionStorage.getItem('password')}
				},
				body: formData
			});

			//console.log(response.status);

			if (!response.ok) {
				throw Error('Could not fetch data');
			}
			else {
				const roomSpaceReservations = await response.json();
				console.log(roomSpaceReservations);

				for (let i = 0; i < roomSpaceReservations.length; i++) {
					setReservedEvent(reservedEvent => ([...reservedEvent, {
						start: roomSpaceReservations[i].startTime,
						end: roomSpaceReservations[i].endTime,
						backgroundColor: 'rgb(168, 60, 50)',
						color: 'rgb(168, 60, 50)',
						textColor: 'rgb(168, 60, 50)',
						title: 'Taken'
					}]));
				}

			}

		} catch (err) {
			console.log(err);
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

		try {
			//const formData = new FormData();
			//formData.append('id', calendarParkingId);

			const bookRoom = {
				startTime: timeStamps.startTime,
				endTime: timeStamps.endTime,
				parkingSpaceId: calendarRoomId,
				username: sessionStorage.getItem('username'),
			}

			let notReservable = false;

			//console.log(bookParking);

			for (let i = 1; i < reservedEvent.length; i++) {
				//console.log(reservedEvent[i]);

				if (!(((reservedEvent[i].start < bookRoom.startTime) && (reservedEvent[i].start <= bookRoom.endTime)) || ((reservedEvent[i].end >= bookRoom.startTime) && (reservedEvent[i].end > bookRoom.endTime)))) {
					notReservable = true;
				}
			}

			if (bookRoom.startTime === "00:00" || notReservable) {
				alert("Unsuccessful reservation. Already reserved.")
				return;
			}

			console.log(JSON.stringify(bookRoom))
			//f3rovci-parkshare.herokuapp.com
			const response = await fetch(`http://10.10.30.10:9000/api/room/reservation/${calendarRoomId}/`, {
				method: 'POST',
				headers: {
					'Authorization': {username: sessionStorage.getItem("username"), password: sessionStorage.getItem("password")},
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(bookRoom)
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
		fetchRoomReservations();
	}, [trigger]);


	/*var bookRoom = function () {
	  console.log(calendarRoomId);
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
						weekends={false}
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

				<button id="button" type="button" onClick={reserve}>Book</button>
			</div>
		</div>
	)
}

export default Calendar;




