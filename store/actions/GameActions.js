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

import { app_uri } from '../../constants/env.js';
import axios from 'axios';

/* ----------------------- *\
|  Action File              |
|---------------------------|
|  1. CRUD Actions          |
|  2. Directional Actions   |
|  3. Status Actions        |
|  4. Helper Actions        |
\* ----------------------- */

/* ----------------------- *\
|  1. CRUD Actions          |
\* ----------------------- */

export const readGame = (game_id) => {
	return {
		type: READ_GAME,
		payload: game_id
	};
};

/* ----------------------- *\
|  2. Directional Actions   |
\* ----------------------- */

export const gameDirection = (direction) => {
	return {
		type: GAME_DIRECTION,
		payload: direction
	};
};

/* ----------------------- *\
|  3. Status Actions        |
\* ----------------------- */

export const gameLoading = (loading) => {
	return {
		type: GAME_LOADING,
		payload: loading
	};
};

export const gameSuccess = (success) => {
	return {
		type: GAME_SUCCESS,
		payload: success
	};
};

export const gameError = (error) => {
	return {
		type: GAME_ERROR,
		payload: error
	};
};

/* ----------------------- *\
|  4. Helper Actions        |
\* ----------------------- */

export const getGames = () => {
	return (dispatch) => {
		// Loading for frontend
		dispatch({ type: GAME_LOADING, payload: true });

		// GET Request
		axios.get(app_uri + '/api/games/get').then(function(response) {
			if (response.data['success'] == true) {
				// Save data
				dispatch({ type: GET_GAMES, payload: response.data['games'] });

				// Directional data
				dispatch({ type: GAME_DIRECTION, payload: 'get_games' });
				dispatch({ type: GAME_SUCCESS, payload: true });
				dispatch({ type: GAME_LOADING, payload: false });
			} else {
				// Directional data
				dispatch({ type: GAME_ERROR, payload: response.data['error'] });
				dispatch({ type: GAME_LOADING, payload: false });
			}
		}).catch(function(error) {
			// Console log error
			console.log('[ERROR] - Error within the `getGames` action.');
			console.log(error);

			// Directional data
			dispatch({ type: GAME_ERROR, payload: error });
			dispatch({ type: GAME_LOADING, payload: false });
		});
	};
};