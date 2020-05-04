import {
	// 1. CRUD
	CREATE_USER,

	// 2. Directional
	USER_DIRECTION,

	// 3. Status
	USER_LOADING,
	USER_SUCCESS,
	USER_ERROR,

	// 4. Helper
	LOGIN_USER,
	IS_LOGGED_IN,
	SET_USER
} from '../types.js';

const initialState = {
	user: [],
	current_id: 0,
	is_logged_in: false,
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
		case CREATE_USER:
			return {
				...state,
				user: action.payload,
				is_logged_in: true
			};
		// 2. Directional Actions
		case USER_DIRECTION:
			return {
				...state,
				direction: action.payload
			};
		// 3. Status Actions
		case USER_LOADING:
			return {
				...state,
				loading: action.payload
			};
		case USER_SUCCESS:
			return {
				...state,
				success: action.payload
			};
		case USER_ERROR:
			return {
				...state,
				error: action.payload
			};
		// 4. Helper Actions
		case LOGIN_USER:
			return {
				...state,
				user: action.payload,
				is_logged_in: true
			};
		case IS_LOGGED_IN:
			return {
				...state,
				is_logged_in: action.payload
			};
		case SET_USER:
			return {
				...state,
				user: action.payload
			};
		default:
			return state;
	}	
};