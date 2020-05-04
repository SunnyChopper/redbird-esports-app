// System Libraries
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, Alert, ActivityIndicator, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Actions
import { userSuccess, userError, userDirection, userLoading, createUser } from '../../store/actions/UserActions';

// Components
import Input from '../../components/Input';
import Button from '../../components/Button';

// Styling
import Colors from '../../constants/Colors';
import MainStyleSheet from '../../styles/MainStyleSheet';

const RegisterScreen = props => {
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
	const [name, setName] = useState('');
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
		if (user_success == true) {
			if (user_direction == 'create_user') {
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
		setLoading(user_loading);
	}, [user_loading]);

	useEffect(() => {
		if (user_error != "") {
			Alert.alert('Error', user_error, [{text: 'OK', onPress: () => { dispatch(userError('')); }}]);
		}
	}, [user_error]);

	/* -------------------- *\
	|  5. Functions          |
	\* -------------------- */

	const validateEmail = (mail) => {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
			return true;
		} else {	
    		return false;
    	}
	}

	const nameTextChange = (name) => {
		setName(name);
	};

	const emailTextChange = (email) => {
		setEmail(email);
	};

	const passwordTextChange = (password) => {
		setPassword(password);
	};

	const register = () => {
		if ((name != "") && (email != "") && (password != "")) {
			if (validateEmail(email) == false) {
				Alert.alert('Error', 'Please enter in valid ISU email.');
			} else {
				var domain = email.replace(/.*@/, "");
				console.log(domain);
				if (domain != 'ilstu.edu') {
					Alert.alert('Error', 'Please enter in valid ISU email.');
				} else {
					dispatch(createUser(name, email, password));
				}
			}
		} else {
			Alert.alert('Error', 'Please fill out all fields.');
		}
	};

	const loginAccount = () => {
		props.navigation.navigate('Login');
	};

	/* -------------------- *\
	|  6. Render             |
	\* -------------------- */

	return (
		<View style={MainStyleSheet.screen}>
			<KeyboardAvoidingView behavior="padding" style={{...MainStyleSheet.container, flex: 3, backgroundColor: '#000000', justifyContent: 'flex-end'}}>
				<View style={{...MainStyleSheet.container, flex: 9, backgroundColor: '#000000', justifyContent: 'flex-end'}}>
					<View style={{...MainStyleSheet.row}}>
						<View style={{...MainStyleSheet.colOne, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 32}}>
							<Image source={require('../../assets/logo.jpg')} style={styles.logo} />
						</View>
					</View>
				</View>

				<View behavior="padding" style={{...MainStyleSheet.container, flex: 5, backgroundColor: '#000000'}}>
					<View style={{...MainStyleSheet.row, paddingHorizontal: 24}}>
						<View style={{...MainStyleSheet.colOne}}>
							<Input onChangeText={nameTextChange} placeholder="Name" value={name} />
							<Input onChangeText={emailTextChange} placeholder="Email" value={email} />
							<Input onChangeText={passwordTextChange} secureTextEntry={true} placeholder="Password" value={password} />
							<Button buttonText="REGISTER" onPress={register} />
						</View>
					</View>
				</View>
			</KeyboardAvoidingView>

			<View style={{...MainStyleSheet.container, flex: 1, backgroundColor: '#000000', justifyContent: 'flex-end'}}>
				<View style={MainStyleSheet.row}>
					<View style={{...MainStyleSheet.colOne, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 48}}>
						<Text onPress={loginAccount} style={{...MainStyleSheet.text, color: 'white', textAlign: 'center', fontSize: 15}}>Already have an account? Click here to login.</Text>
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

export default RegisterScreen;