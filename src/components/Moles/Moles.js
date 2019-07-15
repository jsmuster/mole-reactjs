import React from 'react';

import Mole from './Mole/Mole';

const Moles = props => {

	const moles = [];

	for(let i = 1; i <= props.catsQuantity; i++) {
		moles.push({
			id: `0${i}`
		});
	}

	return(
		<div className="game-wrapper" ref={props.refer}>
			{
				moles.map(mole => {
					return(
						<Mole 
							key={mole.id} 
							mole={mole} 
							clickMole={props.clickMole}/>
					)
				})
			}
		</div>
	)
}

export default Moles;