import {
	// 1. CRUD
	READ_GAME,

	// 2. Directional
	GAME_DIRECTION,

	// 3. Status
	GAME_LOADING,
	GAME_SUCCESS,
	GAME_ERROR,

	// 4. Helper
	GET_GAMES
} from '../types.js';

const initialState = {
	games: [],
	current_id: 0,
	direction: '',
	loading: false,
	success: false,
	error: ''
};

/* ----------------------- *\
|  Reducer File             |
|---------------------------|
|  1. CRUD Actions          |
|  2. Directional Actions   |
|  3. Status Actions        |
|  4. Helper Actions        |
\* ----------------------- */

export default (state = initialState, action) => {
	switch(action.type) {
		// 1. CRUD Actions
		case READ_GAME:
			return {
				...state,
				current_id: action.payload
			};
		// 2. Directional Actions
		case GAME_DIRECTION:
			return {
				...state,
				direction: action.payload
			};
		// 3. Status Actions
		case GAME_LOADING:
			return {
				...state,
				loading: action.payload
			};
		case GAME_SUCCESS:
			return {
				...state,
				success: action.payload
			};
		case GAME_ERROR:
			return {
				...state,
				error: action.payload
			};
		// 4. Helper Actions
		case GET_GAMES:
			return {
				...state,
				games: action.payload
			};
		default:
			return state;
	}	
};