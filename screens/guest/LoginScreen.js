// System Libraries
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, Alert, ActivityIndicator, KeyboardAvoidingView, Keyboard, AsyncStorage } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

// Actions
import { loginUser, userSuccess, userError, userDirection } from '../../store/actions/UserActions';

// Components
import Input from '../../components/Input';
import Button from '../../components/Button';

// Styling
import Colors from '../../constants/Colors';
import MainStyleSheet from '../../styles/MainStyleSheet';

const LoginScreen = props => {
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

	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	/* -------------------- *\
	|  3. Selectors          |
	\* -------------------- */

	const user = useSelector(state => state.user.user);
	const user_success = useSelector(state => state.user.success);
	const user_error = useSelector(state => state.user.error);
	const user_direction = useSelector(state => state.user.direction);
	const user_loading = useSelector(state => state.user.loading);

	/* -------------------- *\
	|  4. Effects            |
	\* -------------------- */

	useEffect(() => {
		setLoading(user_loading);
	}, [user_loading]);

	useEffect(() => {
		if (user_success == true) {
			if (user_direction == 'login_user') {
				dispatch(userSuccess(false));
				
				AsyncStorage.setItem('logged_in', JSON.stringify({
					logged_in: true
				}));

				AsyncStorage.setItem('current_user', JSON.stringify({
					current_user: user
				}));

				props.navigation.navigate('Home');
			}
		}
	}, [user_success]);

	useEffect(() => {
		if (user_error != "") {
			Alert.alert('Error', user_error, [{text: 'OK', onPress: () => { dispatch(userError('')); }}]);
		}
	}, [user_error]);

	/* -------------------- *\
	|  5. Functions          |
	\* -------------------- */

	const emailTextChange = (email) => {
		setEmail(email);
	};

	const passwordTextChange = (password) => {
		setPassword(password);
	};

	const login = () => {
		if ((email != "") && (password != "")) {
			Keyboard.dismiss();
			dispatch(loginUser(email, password));
		} else {
			Alert.alert('Error', 'Please fill out both fields.');
		}
	};

	const registerAccount = () => {
		props.navigation.navigate('Register');
	};

	/* -------------------- *\
	|  6. Render             |
	\* -------------------- */

	if (loading) {
		return (
			<View style={MainStyleSheet.screen}>
				<View style={{...MainStyleSheet.container, flex: 1, backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center'}}>
					<View style={MainStyleSheet.row}>
						<View style={MainStyleSheet.colOne}>
							<ActivityIndicator size="large" color={Colors.primary} />
						</View>
					</View>
				</View>
			</View>
		);
	}

	return (
		<View style={MainStyleSheet.screen}>
			<KeyboardAvoidingView behavior="padding" style={{...MainStyleSheet.container, flex: 3, backgroundColor: '#000000', justifyContent: 'flex-end'}}>
				<View style={{...MainStyleSheet.container, flex: 8, backgroundColor: '#000000', justifyContent: 'flex-end'}}>
					<View style={{...MainStyleSheet.row}}>
						<View style={{...MainStyleSheet.colOne, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 32}}>
							<Image source={require('../../assets/logo.jpg')} style={styles.logo} />
						</View>
					</View>
				</View>

				<View style={{...MainStyleSheet.container, flex: 4, backgroundColor: '#000000'}}>
					<View style={{...MainStyleSheet.row, paddingHorizontal: 24}}>
						<View style={{...MainStyleSheet.colOne}}>
							<Input onChangeText={emailTextChange} placeholder="Email" value={email} />
							<Input onChangeText={passwordTextChange} secureTextEntry={true} placeholder="Password" value={password} />
							<Button buttonText="LOGIN" onPress={login} />
						</View>
					</View>
				</View>
			</KeyboardAvoidingView>

			<View style={{...MainStyleSheet.container, flex: 1, backgroundColor: '#000000', justifyContent: 'flex-end'}}>
				<View style={MainStyleSheet.row}>
					<View style={{...MainStyleSheet.colOne, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 48}}>
						<Text onPress={registerAccount} style={{...MainStyleSheet.text, color: 'white', textAlign: 'center', fontSize: 15}}>Don't have an account? Click here to register.</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	logo: {
		width: '90%',
		height: '90%'
	}
});

export default LoginScreen;