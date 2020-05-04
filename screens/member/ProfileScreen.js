// System Libraries
import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ActivityIndicator, AsyncStorage } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Actions

// Components
import Button from '../../components/Button';

// Styling
import Colors from '../../constants/Colors';
import MainStyleSheet from '../../styles/MainStyleSheet';

// Misc.
import { app_uri } from '../../constants/env';

const ProfileScreen = props => {
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

	/* -------------------- *\
	|  3. Selectors          |
	\* -------------------- */

	const user = useSelector(state => state.user.user);

	/* -------------------- *\
	|  4. Effects            |
	\* -------------------- */

	/* -------------------- *\
	|  5. Functions          |
	\* -------------------- */

	const months = ["Jan.", "Feb.", "Mar.","Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];

	const renderDateTime = () => {
		var t = user.created_at.split(/[- :]/);
		var d = new Date(user.created_at);
		console.log(d);
		var hours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
		var dd = "AM";
		var h = d.getHours();
		if (h >= 12) {
			h = d.getHours() - 12;
			dd = "PM";
		}
		if (h == 0) {
			h = 12;
		}
        var minutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
        var seconds = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
        var time = h + ":" + minutes + " " + dd;

		let formatted_date = months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
		return formatted_date;
	};

	const logout = async () => {
		let keys = ['logged_in', 'current_user'];
		AsyncStorage.multiRemove(keys, (err) => {
			props.navigation.navigate('Guest');
		});
	};

	/* -------------------- *\
	|  6. Render             |
	\* -------------------- */

	if (loading) {
		return (
			<View style={MainStyleSheet.screen}>
				<View style={{...MainStyleSheet.container, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
			<View style={{...MainStyleSheet.container, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<View style={MainStyleSheet.row}>
					<View style={{...MainStyleSheet.colOne, paddingHorizontal: 24}}>
						<Text style={{...MainStyleSheet.headingOne, fontSize: 32, textAlign: 'center', color: Colors.primary}}>{user.name}</Text>
						<Text style={{...MainStyleSheet.headingThree, textAlign: 'center', fontFamily: 'montserrat-light', marginBottom: 32}}>Joined {renderDateTime()}</Text>
						<Button buttonText="LOGOUT" onPress={logout} />
					</View>
				</View>
			</View>
		</View>
	);
};


export default ProfileScreen;