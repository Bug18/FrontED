import React from "react";
import "./css_components/building.css";
import BuildingImg from "./images/building.png";


export default function Building(){



	return(
		<div className="Building-container">
			<div className="building" style={{backgroundImage: `url(${BuildingImg})`, width: `10em`, height: `10em`}}/>
			<label className="address-label"><h4>Address</h4></label>
		</div>
	);
}