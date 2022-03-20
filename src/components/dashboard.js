import React, { useState } from "react";


export default function Dashboard() {
	// possible states: buildings, floors, rooms
	const role = window.sessionStorage.getItem("role");

	const [teamLeaderTeam, setTeamLeaderTeam] = useState("null");
	const [newTeamState, setNewTeamState] = useState(false);
	const [buildingsState, setBuildingsState] = useState(true);
	const [floorsState, setFloorsState] = useState(false);
	const [roomsState, setRoomsState] = useState(false);
	const [selectedBuilding, setSelectedBuilding] = useState(null);
	const [buildingsNum, setBuildingsNum] = useState(0);

	// Buildings
	const Buildings = () => {
		const [newBuilding, setNewBuilding] = useState(false);

		// eslint-disable-next-line react-hooks/exhaustive-deps
		const buildings = getBuildings();

		// Building
		const Building = (_id) => {

			function handleBuildingClick() {
				console.log(_id);
				setBuildingsState(false);
				setFloorsState(true);
				fetch('http://10.10.30.10:9000/api/' + sessionStorage.getItem("role") + '/building/' + (_id["_id"] + 1))
					.then(response => response.json())
					.then(data => console.log(data));
			}

			return (
				<div className="Building-container" style={{margin: `2em`, width: `6em`}}>
					<div className="building" style={{
						backgroundImage: `url(${BuildingImg})`,
						width: `10em`,
						height: `10em`,
						borderRadius: `1em`
					}} onClick={handleBuildingClick}/>
					<label className="address-label"><h4>Address</h4></label>
				</div>
			);
		}

		function getBuildings() {
			// get buildings number

			fetch('http://10.10.30.10:9000/api/' + sessionStorage.getItem("role") + "/building")
				.then(response => response.json())
				.then(data => setBuildingsNum(data["length"]));


			let build = [];

			for (let i = 0; i < buildingsNum; i++) {
				build.push(i);
			}
			return build;
		}

		const [floorPlan, setFloorPlan] = useState(0);

		function addNewBuilding() {
			let floors = document.getElementById("floors-field").value;
			let address = document.getElementById("address-field").value;;
			// add building to database
			let fp = floorPlan;

			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ buildingAddress: address, numberOfFloors: parseInt(floors) })
			};
			fetch('http://10.10.30.10:9000/api/' + sessionStorage.getItem("role") + "/building/", requestOptions)
				.then(response => response.json())
				.then(data => console.log(data));
		}

		const NewBuilding = () => {

			function handleFloorPlan(el) {
				setFloorPlan(el.target.value);
			}

			return (
				<>
					<Form id="login-form" className="mb-3" onSubmit={addNewBuilding}>
						<Form.Group size="lg" controlId="email">
							<Form.Label><h2>Address</h2></Form.Label>
							<Form.Control
								id="address-field"
								autoFocus
								type="text"
								//value={}
								//onChange={(e) => setEmail(e.target.value)}
							/>
							<Form.Label><h2>Number Of Floors</h2></Form.Label>
							<Form.Control
								id="floors-field"
								autoFocus
								type="number"
								//value={}
								//onChange={(e) => setEmail(e.target.value)}
							/>
							<Form.Label><h2>Select Floor Plan</h2></Form.Label>
							<Form.Select className="floor-plan-select" aria-label="Select Floor Plan" size="lg"
										 onChange={handleFloorPlan}>
								<option>Select Floor Plan</option>
								<option value="1">Floor Plan 1</option>
								<option value="2">Floor Plan 2</option>
								<option value="3">Floor Plan 3</option>
							</Form.Select>
							<Button type="submit" style={{marginTop: `2em`}}>Add New Building</Button>
						</Form.Group>
					</Form>
				</>
			);
		}

		function AddBuilding() {
			setNewBuilding(!newBuilding);
		}

		function handleNewTeam() {
			setNewTeamState(!newTeamState);
		}

		const NewTeam = () => {

			const [teamName, setTeamName] = useState("");

			function updateTeamName() {
				setTeamName(document.getElementById("team-name-input").value);
				// send to api teamName
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({"leaderName": sessionStorage.getItem("username"), "teamName": document.getElementById("team-name-input").value, "teamSize": document.getElementById("team-size-input").value})
				};
				fetch('http://10.10.30.10:9000/api/team-leader/create-team', requestOptions)
					.then(response => response.json())
					.then(data => setTeamLeaderTeam(data["teamName"]));
			}

			return (
				<Form onSubmit={updateTeamName}>
					<Form.Group size="lg" controlId="team-name">
						<Form.Label><h2>Enter Team Name</h2></Form.Label>
						<Form.Control
							id="team-name-input"
							type="text"
							//value={team}
							//onChange={(e) => setTeam(e.target.value)}
						/>
						<Form.Label><h2>Enter Team Size</h2></Form.Label>
						<Form.Control
							id="team-size-input"
							type="number"
							//value={team}
							//onChange={(e) => setTeam(e.target.value)}
						/>
					</Form.Group>
					<Button style={{marginTop: '1em'}} type="submit">Create Team</Button>
				</Form>
			);
		}

		useEffect(() => {
			console.log(buildings);
		}, [buildings])

		useEffect(() => {
			if (role === "team-leader") {
				// call api to get team leader team, if none then render new team component

				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ username: sessionStorage.getItem('username')})
				};
				fetch('http://10.10.30.10:9000/api/team-leader/team/', requestOptions)
					.then(response => response.json())
					.then(data => setTeamLeaderTeam(data["teamName"]));
			}
		}, [])

		return (
			<>
				<Container style={{width: `100%`}}>
					<Row className="buildings-row" lg={12}>
						<Col className="buildings-icons" lg={8}>
							<div className="Buildings">
								{buildings.map((el) => <Building _id={el}/>)}
							</div>
						</Col>
						<Col lg={4}>
							<div>
								{(role === "team-leader" && teamLeaderTeam !== "null") ?
									<h2>You are leader of team: {teamLeaderTeam}</h2> :
									<h2>You don't have a team jet :(</h2>}
								{role === "admin" ?
									<Button id="add-building" onClick={AddBuilding} style={{marginTop: `1em`}}>Add
										Building</Button> : null}
								{(role === "team-leader" && teamLeaderTeam === "null") ? <Button style={{marginTop: '1em'}} onClick={handleNewTeam}>New Team</Button> : null}
								{newBuilding ? <NewBuilding/> : null}
								{newTeamState ? <NewTeam/> : null}
							</div>
						</Col>
					</Row>
				</Container>
			</>
		);
	}

	const Floors = () => {

		const [floorsArray, setFloorsArray] = useState([]);
		const [selectedFloor, setSelectedFloor] = useState(0);

		function createFloorsArray(fn) {
			let _floors = [];
			for (let i = fn; i > 0; i--) {
				_floors.push(i);
			}
			setFloorsArray(_floors);
		}

		useEffect(() => {
			// call api to get number of floors
			let floors_number = 10;

			//fetch()
			createFloorsArray(floors_number);

		}, [])

		const Floor = (id) => {

			const handleFloorClick = () => {
				setSelectedFloor(id.id);
				setFloorsState(false);
				setRoomsState(true);
				fetch('http://10.10.30.10:9000/api/floor/' + selectedFloor)
					.then(response => response.json())
					.then(data => console.log(data));
			}

			return (
				<div onClick={handleFloorClick}>
					<Canvas style={{height: `15vh`, marginTop: ``}}>
						<ambientLight/>
						<pointLight position={[10, 10, 10]}/>
						<Box position={[-10, -2, 2]}/>
					</Canvas>
					<label><h4>{id.id}.</h4></label>
				</div>
			);
		}

		function Box(props) {
			// This reference will give us direct access to the mesh
			const mesh = useRef();
			// Set up state for the hovered and active state
			const [hovered, setHover] = useState(false);
			const [active, setActive] = useState(false);
			// Subscribe this component to the render-loop, rotate the mesh every frame
			// useFrame((state, delta) => (mesh.current.rotation.x += 0.01));
			// Return view, these are regular three.js elements expressed in JSX

			return (
				<mesh
					{...props}
					ref={mesh}
					scale={active ? 1.1 : 1}
					//onClick={handleFloorClick}
					onPointerOver={(event) => setHover(true)}
					onPointerOut={(event) => setHover(false)}
				>
					<boxGeometry args={[10, 5, 2]}/>
					<meshStandardMaterial color={hovered ? 'red' : 'grey'}/>
				</mesh>
			);
		}


		return (
			<>
				<h1>Select Floor</h1>
				{floorsArray.map(fl => <Floor id={fl}/>)}
			</>
		);
	}

	const Rooms = () => {

		const [floorMap, setFloorMap] = useState(0);
		const [inRoom, setInRoom] = useState(false);


		const RoomPlanDivs1 = () => {
			let roomPlan;
			roomPlan = Tlc1Img;

			/*return (
				<>  <Col lg={8}>
					<div style={{backgroundImage: `url(${roomPlan})`, width: ``, backgroundRepeat: `no-repeat`, margin: `10em`}} >
                    				</div>
				</Col>
                     <Col>
                      <div className="WorkSpace">
						  <Form.Label><h2>Select WorkSpace Plan</h2></Form.Label>
						  <Form.Select className="workspace-select" aria-label="Select Work Space" size="lg" onChange={}>
							  <option>Select WorkSPace</option>
							  <option value="1">Floor Plan 1</option>
							  <option value="2">Floor Plan 2</option>
							  <option value="3">Floor Plan 3</option>
							  <option value="4">Floor Plan 4</option>
							  <option value="5">Floor Plan 5</option>
							  <option value="6">Floor Plan 6</option>
							  <option value="7">Floor Plan 7</option>
							  <option value="8">Floor Plan 8</option>
						  </Form.Select>
					  </div>
					 </Col>

				</>
			);
		}

		const RoomPlanDivs2 = () => {
			let roomPlan;
			roomPlan = Tlc2Img;

			return (
				<>   <div style={{backgroundImage: `url(${roomPlan})`, width: ``, backgroundRepeat: `no-repeat`, margin: `10em`}} >
				</div>
					<Form>
					 <Form.Group>
						<Form.Label><h2>Select WorkSpace Plan</h2></Form.Label>
						<Form.Select className="workspace-select" aria-label="Select Work Space" size="lg" onChange={}>
							<option>Select WorkSPace</option>
							<option value="1">Floor Plan 1</option>
							<option value="2">Floor Plan 2</option>
							<option value="3">Floor Plan 3</option>
							<option value="4">Floor Plan 4</option>
						</Form.Select>
						</Form.Group>
					</Form>
				</>
			);
		}

		const RoomPlanDivs3 = () => {
			let roomPlan;
			roomPlan = Tlc3Img;

			return (
				<>   <div style={{backgroundImage: `url(${roomPlan})`, width: ``, backgroundRepeat: `no-repeat`, margin: `10em`}} >
				</div>
					<Form>
					 <Form.Group>
						<Form.Label><h2>Select WorkSpace Plan</h2></Form.Label>
						<Form.Select className="workspace-select" aria-label="Select Work Space" size="lg" onChange={}>
							<option>Select WorkSPace</option>
							<option value="1">Floor Plan 1</option>
							<option value="2">Floor Plan 2</option>
							<option value="3">Floor Plan 3</option>
							<option value="4">Floor Plan 4</option>
							<option value="5">Floor Plan 5</option>
							<option value="6">Floor Plan 6</option>
						</Form.Select>
						</Form.Group>
					</Form>
				</>
			);
		}

		const RoomPlanDivs4 = () => {
			let roomPlan;
			roomPlan = Tlc4Img;

			return (
				<>   <div style={{backgroundImage: `url(${roomPlan})`, width: ``, backgroundRepeat: `no-repeat`, margin: `10em`}} >
				</div>
					<Form>
					 <Form.Group>
						<Form.Label><h2>Select WorkSpace Plan</h2></Form.Label>
						<Form.Select className="workspace-select" aria-label="Select Work Space" size="lg" onChange={}>
							<option>Select WorkSPace</option>
							<option value="1">Floor Plan 1</option>
							<option value="2">Floor Plan 2</option>
							<option value="3">Floor Plan 3</option>
							<option value="4">Floor Plan 4</option>
							<option value="5">Floor Plan 5</option>
							<option value="6">Floor Plan 6</option>
							<option value="7">Floor Plan 7</option>
							<option value="8">Floor Plan 8</option>
						</Form.Select>
						</Form.Group>
					</Form>
				</>
			)*/
		}


			const Room = () => {
				return (
					<div>

					</div>
				);
			}

			const FloorPlanDivs1 = () => {
				let floorPlan;
				floorPlan = Fp1Img;

				return (
					<>
						<div style={{
							backgroundImage: `url(${floorPlan})`,
							width: ``,
							backgroundRepeat: `no-repeat`,
							margin: `10em`
						}}>
							<div style={{width: '510px', height: '150px', position: 'absolute'}}/>
							<div style={{width: '344px', height: '236px', position: 'relative'}}/>
							<div style={{width: '290px', height: '271px'}}/>
							<div style={{width: '205px', height: '239px'}}/>
						</div>

					</>
				);
			}

			const FloorPlanDivs2 = () => {
				let floorPlan;
				floorPlan = Fp2Img;

				return (
					<>
						<div style={{
							backgroundImage: `url(${floorPlan})`,
							height: `330px`,
							width: ``,
							backgroundRepeat: `no-repeat`,
							margin: `10em`
						}}>
							<div style={{width: '223px', height: '209px', position: 'absolute'}}/>
							<div style={{width: '265px', height: '182px', position: 'relative'}}/>
							<div style={{width: '158px', height: '184px'}}/>
							<div style={{width: '394px', height: '123px'}}/>
						</div>

					</>
				);
			}

			const FloorPlanDivs3 = () => {
				let floorPlan;
				floorPlan = Fp3Img;
				return (
					<>

						<div style={{
							backgroundImage: `url(${floorPlan})`,
							height: `596px`,
							width: ``,
							backgroundRepeat: `no-repeat`,
							margin: `10em`
						}}>
							<div style={{width: '180px', height: '210px', position: 'absolute'}}/>
							<div style={{width: '304px', height: '209', position: 'relative'}}/>
							<div style={{width: '256px', height: '240p'}}/>
							<div style={{width: '453px', height: '141px'}}/>
						</div>

					</>
				);
			}


			const FloorPlan = () => {
				const [value, onChange] = useState(new Date());

				function confirmReservation() {
					let reservedTimeBeginning = document.getElementById("time-beg").value;
					let reservedTimeEnding = document.getElementById("time-end").value;
				}

				return (
					<div>
						<h1>Dobrodošli na odabrani kat!</h1>
						<Container style={{maxWidth: `100%`, display: 'flex'}}>
							<Col lg={6}>
								{floorMap === 1 ? <FloorPlanDivs1/> : floorMap === 2 ?
									<FloorPlanDivs2/> : floorMap === 3 ? <FloorPlanDivs3/> : null}
							</Col>
							<Col lg={4}>
								<div style={{marginTop: `10em`, marginLeft: `10em`}}>
									<Calendar onChange={onChange} value={value}/>
								</div>
								<Form>
									<Form.Group onSubmit={confirmReservation}>
										<Form.Label style={{marginLeft: `3em`}}><h3>Select Reservation Hours</h3>
										</Form.Label>
										<Form.Control
											style={{width: `10em`, marginLeft: `16em`}}
											id="time-beg"
											type="time"
										/>
										<Form.Control
											style={{width: `10em`, marginLeft: `16em`}}
											id="time-end"
											type="time"
										/>
									</Form.Group>
								</Form>
								<Button style={{marginTop: `2em`, marginLeft: `3em`}} type="submit">Reserve
									Room</Button>
							</Col>
						</Container>

					</div>
				);
			}

			useEffect(() => {
				// call api to get floor map
				setFloorMap(3);
			}, [])

			return (
				<>
					{inRoom ? <Room/> : <FloorPlan/>}
				</>
			);
		}


		return (
			<div>
				{buildingsState ? <Buildings/> : null}
				{floorsState ? <Floors/> : null}
				{roomsState ? <Rooms/> : null}
			</div>
		);
	}
