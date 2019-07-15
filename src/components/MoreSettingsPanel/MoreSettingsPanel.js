import React from 'react';


class MoreSettingsPanel extends React.Component {

	state = {
		beginPos: -300,
		panelOpened: false,
	}


	toggleMoreSetPanel = () => {
		this.setState({
			panelOpened: !this.state.panelOpened
		});
		let self = this;

		setTimeout(() => {
			if(this.state.panelOpened === true) {
				let openTimer = requestAnimationFrame(function openSett() {
				  self.setState({
				  	beginPos: self.state.beginPos + 20
				  });
				  openTimer = requestAnimationFrame(openSett);

				  if (self.state.beginPos >= 0) {
				    self.setState({
				    	beginPos: 0
				    });
				    cancelAnimationFrame(openTimer);
				  }
				});
			} else {
				let closeTimer = requestAnimationFrame(function closeSett() {
				   self.setState({
					  	beginPos: self.state.beginPos - 20
					  });
				  closeTimer = requestAnimationFrame(closeSett);

				  if (self.state.beginPos <= -300) {
				     self.setState({
					    	beginPos: -300
					    });
				    cancelAnimationFrame(closeTimer);
				  }
				});
			}
		}, 100);

	}

	gameDurationChange = (event) => {
		event.persist();
		if (+event.target.value < +event.target.min || isNaN(event.target.value)) {
      event.target.value = event.target.min;
    };
		this.props.gameDurationChange(+event.target.value);
	}

	meowMinTimeChange = (event) => {
		event.persist();

		if (+event.target.value < +event.target.min || isNaN(event.target.value)) {
      event.target.value = event.target.min;
    };

    if (+event.target.value >= this.props.meowMaxTime) {
      this.props.meowMaxTimeChange(+(+event.target.value + this.props.controlSettings.maxDisplayCatTimeControl.step).toFixed(1));
    }

		this.props.meowMinTimeChange(+event.target.value);
	}

	meowMaxTimeChange = (event) => {
		event.persist();

		if (+event.target.value < +event.target.min || isNaN(event.target.value)) {
      event.target.value = event.target.min;
    };

    if (+event.target.value <= this.props.meowMinTime) {
      this.props.meowMinTimeChange(+(+event.target.value - this.props.controlSettings.minDisplayCatTimeControl.step).toFixed(1));
    }
		this.props.meowMaxTimeChange(+event.target.value);
	}

	afterEveryMeowIntervalChange = (event) => {
		event.persist();
		if (+event.target.value < +event.target.min || isNaN(event.target.value)) {
      event.target.value = event.target.min;
    };
		this.props.afterEveryMeowIntervalChange(+event.target.value);
	}	

	meowAfterMeowChange = (event) => {
		event.persist();
		this.props.meowAfterMeowChange(event.target.checked);
	}	

	render() {
		return(
			<div className='more-settings-panel' id="more-settings-panel" style={{'left': `${this.state.beginPos}px`}}>
				<div className="more-set-content-wrapp">
					<h2>Settings</h2>

					<form >
						<label className="container-label" id="cat-after-cat">
						  <input 
						  	type="checkbox" 
						  	checked={this.props.meowAfterMeow}
						  	onChange={this.meowAfterMeowChange}
						  	/>
						  <span className="checkmark"></span>
						  Cat after cat
						</label>

						<hr />
						<label htmlFor="game-duration">Game duration</label>
						<br />
						<input 
							type="number" 
							id="game-duration" 
							value={this.props.gameDuration} 
							min={this.props.controlSettings.gameDurationControl.min} 
							step={this.props.controlSettings.gameDurationControl.step} 
							onChange={this.gameDurationChange} />
						<hr />
						<label htmlFor="min-meow-time">Min display cat time</label>
						<input 
							type="number" 
							id="min-meow-time"
							 value={this.props.meowMinTime} 
							 min={this.props.controlSettings.minDisplayCatTimeControl.min}
							 step={this.props.controlSettings.minDisplayCatTimeControl.step} 
							 onChange={this.meowMinTimeChange} />
						<hr />
						<label htmlFor="max-meow-time">Max display cat time</label>
						<input 
							type="number" 
							id="max-meow-time" 
							value={this.props.meowMaxTime} 
							min={this.props.controlSettings.maxDisplayCatTimeControl.min}
							step={this.props.controlSettings.maxDisplayCatTimeControl.step} 
							onChange={this.meowMaxTimeChange} />
						<hr />
						<label htmlFor="meow-after-meow-time">Cat after cat pause time</label>
						<input 
							type="number" 
							id="meow-after-meow-time" 
							value={this.props.afterEveryMeowInterval} 
							min={this.props.controlSettings.meowAfterMeowTimeControl.min}
							step={this.props.controlSettings.meowAfterMeowTimeControl.step} 
							onChange={this.afterEveryMeowIntervalChange}/>
					
					</form>
				</div>

				<div 
					className="open-more-settings" 
					id="open-more-settings"
					onClick={this.toggleMoreSetPanel}>
					<img src="images/gears.png" alt="settings" />
				</div>
			</div>
		)
	}
}

export default MoreSettingsPanel;