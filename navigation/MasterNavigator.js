// Libraries
import React, { useState, useEffect, useRef } from 'react';
import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { useDispatch } from 'react-redux';

// Actions
import { isLoggedIn, setUser } from '../store/actions/UserActions';

// Navigators
import AppNavigator from './AppNavigator';


const MasterNavigator = props => {
	/* --------------------- *\
	|  Screen                 |
	|-------------------------|
	|  1. Dispatch            |
	|  2. State variables     |
	|  3. Selectors           |
	|  4. Effects             |
	|  5. Functions           |
	|  6. Render              |
	\* --------------------- */

	/* -------------------- *\
	|  1. Dispatch           |
	\* -------------------- */

	const dispatch = useDispatch();

	/* -------------------- *\
	|  2. State variables    |
	\* -------------------- */

	const [hasOnboarded, setHasOnboarded] = useState(false);
	const navRef = useRef();

	/* -------------------- *\
	|  3. Selectors          |
	\* -------------------- */

	/* -------------------- *\
	|  4. Effects            |
	\* -------------------- */

	/* -------------------- *\
	|  5. Functions          |
	\* -------------------- */

	const fetchLogin = async () => {
		AsyncStorage.getItem('logged_in').then((value) => {
			console.log(value);
			if (value != null) {
				var returnJSON = JSON.parse(value);
				const loggedIn = returnJSON['logged_in'];

				if (loggedIn == true) {
					dispatch(isLoggedIn(true));

			 		// Get user id
			 		AsyncStorage.getItem('current_user').then((value) => {
			 			var returnJSON = JSON.parse(value);
			 			const current_user = returnJSON['current_user'];
			 			dispatch(setUser(current_user));

				 		navRef.current.dispatch(
							NavigationActions.navigate({
								routeName: 'Home'
							})
						);
			 		});
				} else {
					// Navigate to login
					navRef.current.dispatch(
						NavigationActions.navigate({
							routeName: 'Login'
						})
					);
				}
			} else {
				console.log('Navigating to login');
				// Navigate to login by default
				navRef.current.dispatch(
					NavigationActions.navigate({
						routeName: 'Login'
					})
				);
			}
		});
	};

	/* ----- Effects ----- */
	useEffect(() => {
		fetchLogin();
	}, []);

	/* ----- JSX ----- */
	return <AppNavigator ref={navRef} />
};

export default MasterNavigator;