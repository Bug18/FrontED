import logo from './logo.svg';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Routes,
	Link
} from "react-router-dom";
import './App.css';
import Navigation from "./components/navigation.js";

import Login from "./components/login.js";


function App() {
	return (
		<div className="App">
			<Navigation/>
			<Login/>
			{/*<Routes>
				<Route path="/" element={<Login/>} />
			</Routes>*/}
		</div>
	);
}

export default App;
