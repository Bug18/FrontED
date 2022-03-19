import logo from './logo.svg';
import {Route, Routes} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./components/navigation.js";

import Login from "./components/login.js";


function App() {
	return (
		<div className="App">
			<Navigation/>
			<Routes>
				<Route path="/" element={<Login/>} />
			</Routes>
		</div>
	);
}

export default App;
