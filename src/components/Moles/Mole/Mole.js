import React from 'react';

const Mole = props => {
	return(
		<div className="hole">
		  <img src="images/mole_behind.png" alt="dirt" className="hole_back" draggable="false" />
		  <img 
		  	src="images/mole_01.png" 
		  	alt="mole" 
		  	className="mole-pic" 
		  	draggable="false"
		  	id={props.mole.id} 
		  	onClick={props.clickMole}/>
		  <div className="hole_front"></div>
		</div>
	)
}

export default Mole;