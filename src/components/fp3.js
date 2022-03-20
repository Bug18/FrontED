import "./css_components/fp3.css";
import {Col, Row} from "react-bootstrap";
import React, {useEffect} from "react";
import Home from "./home";

const fp3 = () => {
	return(
           <><Row>
			   <Col lg={8}>
				   <div className = "prvi">
				   </div>
				   <div className = "drugi">
				   </div>
				   <h1> <i>Dobrodosšli u sobu</i></h1>
			   </Col>
			   <Col lg = {2}>
				   <div className = "treci">
				   </div>
				   <div className = "cetvrti">
				   </div>
				   <div className = "stubiste">
				   </div>
			   </Col>
			   <Col>
				   <div>

				   </div>
			   </Col>
		   </Row>
		   </>
	);
}

export default fp3;