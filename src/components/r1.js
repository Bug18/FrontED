import tlocrt1 from "./images/tlocrt1.jpg";
import "./css_components/r1.css";
import {Col, Row} from "react-bootstrap";
import React, {useEffect} from "react";
import fp2 from "./fp2";
import tlocrt from "./images/tlocrt1.jpg";

const r1 = () => {
	return (
		<>
			<div>
				<h1 className = "Naslov">Dobrodošli u sobu!</h1>
			</div>
			<div id="tlocrt" style = {{ background: `url(${tlocrt})`,
				opacity: `70%`}}>
			</div>
		</>

	);

}

export default r1;