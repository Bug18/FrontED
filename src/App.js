import logo from './logo.svg';
import {Route, Routes, useLocation} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./components/navigation.js";

import Home from "./components/home";
import Login from "./components/login.js";
import Signup from "./components/signup.js";
import Dashboard from "./components/dashboard";
import React, {useEffect, useState} from "react";
import Logout from "./components/logout";


function App() {

	return (
		<div className="App">
			<div className="App-header">
				<Navigation/>
			</div>
			<div className="App-body">
				<Routes>
					<Route path="/" element={<Home/>} />
					<Route path="/login" element={<Login/>} />
					<Route path="/signup" element={<Signup/>} />
					<Route path="/dashboard" element={<Dashboard/>} />
					<Route path="/logout" element={<Logout/>} />

				</Routes>
			</div>
		</div>
	);
}

export default App;
