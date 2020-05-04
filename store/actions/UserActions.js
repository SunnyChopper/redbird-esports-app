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

import { AsyncStorage } from 'react-native';
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

export const createUser = (name, email, password) => {
	return (dispatch) => {
		dispatch({ type: USER_LOADING, payload: true });

		const params = {
			name: name,
			email: email,
			password: password
		};

		axios.post(app_uri + '/api/users/create', params).then((response) => {
			if (response.data['success'] == true) {
				dispatch({ type: CREATE_USER, payload: response.data['user'] });

				dispatch({ type: USER_LOADING, payload: false });
				dispatch({ type: USER_DIRECTION, payload: 'create_user' });
				dispatch({ type: USER_SUCCESS, payload: true });
			} else {
				dispatch({ type: USER_LOADING, payload: false });
				dispatch({ type: USER_ERROR, payload: response.data['error'] });
			}
		}).catch((error) => {
			console.log('[ERROR] - Error while creating user.');
			console.log(error);

			dispatch({ type: USER_LOADING, payload: false });
			dispatch({ type: USER_ERROR, payload: error });
		});
	};
};

/* ----------------------- *\
|  2. Directional Actions   |
\* ----------------------- */

export const userDirection = (direction) => {
	return {
		type: USER_DIRECTION,
		payload: direction
	};
};

/* ----------------------- *\
|  3. Status Actions        |
\* ----------------------- */

export const userLoading = (loading) => {
	return {
		type: USER_LOADING,
		payload: loading
	};
};

export const userSuccess = (success) => {
	return {
		type: USER_SUCCESS,
		payload: success
	};
};

export const userError = (error) => {
	return {
		type: USER_ERROR,
		payload: error
	};
};

/* ----------------------- *\
|  4. Helper Actions        |
\* ----------------------- */

export const loginUser = (email, password) => {
	return (dispatch) => {
		dispatch({ type: USER_LOADING, payload: true });

		const params = {
			email: email,
			password: password
		};

		axios.post(app_uri + '/api/users/login', params).then((response) => {
			if (response.data['success'] == true) {
				dispatch({ type: LOGIN_USER, payload: response.data['user'] });

				dispatch({ type: USER_LOADING, payload: false });
				dispatch({ type: USER_DIRECTION, payload: 'login_user' });
				dispatch({ type: USER_SUCCESS, payload: true });
			} else {
				dispatch({ type: USER_LOADING, payload: false });
				dispatch({ type: USER_ERROR, payload: response.data['error'] });
			}
		}).catch((error) => {
			console.log('[ERROR] - Error while logging in user.');
			console.log(error);

			dispatch({ type: USER_LOADING, payload: false });
			dispatch({ type: USER_ERROR, payload: error });
		});
	};
};

export const isLoggedIn = (logged_in) => {
	return {
		type: IS_LOGGED_IN,
		payload: logged_in
	}
};

export const setUser = (user) => {
	return {
		type: SET_USER,
		payload: user
	}
};