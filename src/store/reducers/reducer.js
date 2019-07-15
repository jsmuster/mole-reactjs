const initialState = {
      gameDuration: 60,
      numKeyPad: true,
      meowMinTime: 1,
      meowMaxTime: 2,
      afterEveryMeowInterval: 1,
      meowAfterMeow: false,
      catsQuantity: 9,
      gameOn: false,
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


export default function reducer(state = initialState, action) {

	switch (action.type) {
		case 'TOGGLE_GAME':
			let gameStatus = !state.gameOn;

			if(action.value != null) gameStatus = action.value
			return {
				...state,
				gameOn: gameStatus
			}
		case 'CHANGE_GAME_DURATION':
			return {
				...state,
				gameDuration: action.value
			}
		case 'CHANGE_MEOW_MIN_TIME':
			return {
				...state,
				meowMinTime: action.value
			}
		case 'CHANGE_MEOW_MAX_TIME':
			return {
				...state,
				meowMaxTime: action.value
			}
		case 'CHANGE_MEOW_AFTER_MEOW_INTERVAL':
			return {
				...state,
				afterEveryMeowInterval: action.value
			}
		case 'CHANGE_MEOW_AFTER_MEOW':
			return {
				...state,
				meowAfterMeow: action.value
			}
		default:
			return state
	}

}