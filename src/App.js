import React from 'react';
import './App.css';
import {connect} from 'react-redux';

import WhackMole from './WhackMole';

import ControlPanel from './components/ControlPanel/ControlPanel';
import Moles from './components/Moles/Moles';
import MoreSettingsPanel from './components/MoreSettingsPanel/MoreSettingsPanel';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.startBtn = React.createRef();
    this.scoreOut = React.createRef();
    this.allScoresOut = React.createRef();

    this.molesParentList = React.createRef();
    this.moles = [];

    this.state = {
      meowMinTime: 1,
      meowMaxTime: 2,
      afterEveryMeowInterval: 1,
      meowAfterMeow: false,
      catsQuantity: 9,
      moreSettingsPanel: {
        gameDurationControl: {
          min: 5,
          step: 1
        },
        minDisplayCatTimeControl: {
          min: 0.4,
          step: 0.1
        },
        maxDisplayCatTimeControl: {
          min: 0.5,
          step: 0.1
        },
        meowAfterMeowTimeControl: {
          min: 0.3,
          step: 0.1
        }
      }
    }
  }

  componentDidMount() {
    const molesListParent = this.molesParentList.current.childNodes;
    const moles = [];

    for(let i = 0; i < molesListParent.length; i++) {
      moles.push(molesListParent[i].childNodes[1]);
    }
    
    this.moles = moles;

    this.wam =  new WhackMole(
      this.startBtn.current, 
      this.moles,  
      this.scoreOut.current, 
      this.props.gameDuration, {
        numKeyPad: this.props.numKeyPad,
        allScoresBtn: this.allScoresOut.current,
        meowMinTime: this.props.meowMinTime,
        meowMaxTime:  this.props.meowMaxTime,
        afterEveryMeowInterval: this.props.afterEveryMeowInterval,
        meowAfterMeow: this.props.meowAfterMeow
    });
  }

  clickStartBtn = () => {
    const self = this;
    this.props.toggleGame();
    setTimeout(() =>{
      if(this.props.gameOn === true) {
        this.wam.init();
          let timer = setTimeout(function timerFunc() {
          if(self.wam.timeUp === true) {
            self.props.toggleGame(false);
          } else {
            timer = setTimeout(timerFunc, 1000);
          }
        }, self.props.gameDuration * 1000);
      } else {
        this.wam.stop();
      }
    }, 100);
  }

  clickResetBtn = () => {
    this.wam.resetApp();
    this.props.toggleGame(false);
  }

  clickMole = (event) => {
    event.persist();
    this.wam.clickd(event.target);
  }

  gameDurationChange = time => {
    this.props.gameDurationChange(time);

    setTimeout(() => {
      this.wam.setGameDuration(this.props.gameDuration);
    }, 100);
  }

  meowMinTimeChange = time => {
    this.props.meowMinTimeChange(time)

    setTimeout(() => {
      this.wam.setMinmeowTime(this.props.meowMinTime);
    }, 100);
  }

  meowMaxTimeChange = time => {
    this.props.meowMaxTimeChange(time);

    setTimeout(() => {
      this.wam.setMaxMeowTime(this.props.meowMaxTime);
    }, 100);
  }

  afterEveryMeowIntervalChange = time => {
    this.props.afterEveryMeowIntervalChange(time);

    setTimeout(() => {
      this.wam.setMeowAfterMeowTime(this.props.afterEveryMeowInterval);
    }, 100);
  }

  meowAfterMeowChange = flag => {
    this.props.meowAfterMeowChange(flag);
    setTimeout(() => {
      this.wam.setMeowAfterMeow(this.props.meowAfterMeow);
    }, 100);
  }

  render() {
    return (
      <div className="App">

        <MoreSettingsPanel
          gameDuration={this.props.gameDuration}
          meowMinTime={this.props.meowMinTime}
          meowMaxTime={this.props.meowMaxTime}
          afterEveryMeowInterval={this.props.afterEveryMeowInterval}
          meowAfterMeow={this.props.meowAfterMeow}
          controlSettings={this.props.moreSettingsPanel}

          gameDurationChange={this.gameDurationChange}
          meowMinTimeChange={this.meowMinTimeChange}
          meowMaxTimeChange={this.meowMaxTimeChange}
          afterEveryMeowIntervalChange={this.afterEveryMeowIntervalChange}
          meowAfterMeowChange={this.meowAfterMeowChange}
        />

        <ControlPanel refers={{
          startBtn: this.startBtn,
          scoreOut: this.scoreOut,
          allScoresOut: this.allScoresOut
          }}
          gameOn={this.props.gameOn}
          clickStartBtn={this.clickStartBtn}
          clickResetBtn={this.clickResetBtn}
        />

        <Moles 
          refer={this.molesParentList} 
          catsQuantity={this.props.catsQuantity} 
          clickMole={this.clickMole}/>


      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    gameDuration:state.gameDuration,
    numKeyPad: state.numKeyPad,
    meowMinTime: state.meowMinTime,
    meowMaxTime: state.meowMaxTime,
    afterEveryMeowInterval: state.afterEveryMeowInterval,
    meowAfterMeow: state.meowAfterMeow,
    catsQuantity: state.catsQuantity,
    gameOn: state.gameOn,
    moreSettingsPanel: state.moreSettingsPanel
  }
}

function mapDispatchToProps(dispatch) {
  return {
   toggleGame: gameStatus => dispatch({ 
    type: 'TOGGLE_GAME',
    value: gameStatus
  }),
   gameDurationChange: time => dispatch({ 
    type: 'CHANGE_GAME_DURATION', 
    value: time }),
   meowMinTimeChange: time => dispatch({
    type: 'CHANGE_MEOW_MIN_TIME', 
    value: time 
   }),
   meowMaxTimeChange: time => dispatch({
    type: 'CHANGE_MEOW_MAX_TIME', 
    value: time 
   }),
   afterEveryMeowIntervalChange: time => dispatch({
    type: 'CHANGE_MEOW_AFTER_MEOW_INTERVAL',
    value: time
   }),
   meowAfterMeowChange: flag => dispatch({
    type: 'CHANGE_MEOW_AFTER_MEOW',
    value: flag
   })

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
