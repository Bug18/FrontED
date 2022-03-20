import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./css_components/signup.css";
import {useNavigate} from 'react-router-dom';




export default function Signup(){
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [role, setRole] = useState("");
	const [team, setTeam] = useState("");
	const [teams, setTeams] = useState(["Prvi", "Drugi"]);
	const navigate = useNavigate();

	const [hideLeader, setHideLeader] = useState(true);
	const [hideMember, setHideMember] = useState(true);

	function validateForm() {
		return email.length > 0 && password.length > 0 && passwordConfirm.length > 0;
	}


	function handleSubmit(event) {


		event.preventDefault();
		window.sessionStorage.setItem('user', email);
		window.sessionStorage.setItem('role', role);
		// send to db
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: email, password: password, role: role })
		};

		fetch('http://10.10.30.10:9000/api/register', requestOptions)
			.then(() => navigate("/dashboard"));
	}

	function handleRole(el){
		if(el.target.value === "1"){
			setHideLeader(false);
			setHideMember(true);
			setRole("team-leader");
		}else if(el.target.value === "2"){
			setHideLeader(true);
			setHideMember(false);
			setRole("team-member");
			getAllTeams()
		}else if(el.target.value === "3"){
			setHideLeader(true);
			setHideMember(true);
			setRole("independent");
		}
	}

	function getAllTeams(){
		setTeams(["Prvi", "Drugi", "Treci", "Cetvrti"]);
	}

	function updateTeamName(){
		setTeam(document.getElementById("team-name-input").value);
	}

	const handleTeam = event => {
		setTeam(event.target.value);
	}

	const TeamLeader = () => {
		return(
			<>
				<Form.Group size="lg" controlId="team-name">
					<Form.Label><h2>Enter Team Name</h2></Form.Label>
					<Form.Control
						id="team-name-input"
						type="text"
						//value={team}
						//onChange={(e) => setTeam(e.target.value)}
					/>
					<Button id="apply-team-name" type="button" onClick={updateTeamName}>Apply Team Name</Button>
				</Form.Group>
			</>
		);
	}

	const TeamMember = () => {
		return(
			<>
				<Form.Select className="team-select" aria-label="Select your team" size="lg" onChange={handleTeam}>
					<option>Select your team</option>
					{teams.map((_team) => <option value={_team.id}>{_team}</option>)}
				</Form.Select>
			</>
		);
	}

	return (
		<div className="Login">
			<div className="Login-container">
				<Form id="login-form" className="mb-3" onSubmit={handleSubmit}>
					<Form.Group size="lg" controlId="email">
						<Form.Label><h2>Email</h2></Form.Label>
						<Form.Control
							autoFocus
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Group>
					<Form.Group size="lg" controlId="password">
						<Form.Label><h2>Password</h2></Form.Label>
						<Form.Control
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Group>
					<Form.Group size="lg" controlId="passwordConfirm">
						<Form.Label><h2>Confirm Password</h2></Form.Label>
						<Form.Control
							type="password"
							value={passwordConfirm}
							onChange={(e) => setPasswordConfirm(e.target.value)}
						/>
					</Form.Group>
					<Form.Select className="role-select" aria-label="Select your role" size="lg" onChange={handleRole}>
						<option>Select your role</option>
						<option value="1">Team Leader</option>
						<option value="2">Team Member</option>
						<option value="3">Independent user</option>
					</Form.Select>
					{hideMember ? null : <TeamMember/>}
					<Button id="login-button" block size="lg" type="submit" disabled={!validateForm()}>
						SignUp
					</Button>
				</Form>
			</div>
		</div>
	);
}