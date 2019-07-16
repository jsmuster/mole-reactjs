import React from 'react';


const ControlPanel = props => {
	const classes = ['control-btn'];
	if(props.gameOn === false) {
		classes.push('start');
	} else {
		classes.push('finish');
	}
		return(
			<div className="control-panel">
				<h1>Whack a Mole!</h1>
				<span className="info-game">
					Hi!. Welcome to Whack a Mole game! <br/>
					To play press "START". Then, click on a mole's head. <br/>
					To end game press "FINISH". <br/>
					To reset score - press 'RESET';
				</span>

				<div className="control-panel-items">

					<div 
						className={classes.join(' ')}
						id="control-btn" 
						ref={props.refers.startBtn}
						onClick={props.clickStartBtn}
						></div>

					<div className="score">
						Score: 
							<span id="score" ref={props.refers.scoreOut}>0</span>
						/
							<span id="avaliable-score" ref={props.refers.allScoresOut}>0</span>
					</div>

					<div 
						className="control-btn reset-btn" 
						id="reset" 
						onClick={props.clickResetBtn}></div>
				</div>
			</div>
		)
}

export default ControlPanel;