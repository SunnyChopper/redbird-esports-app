// System Libraries
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, Alert, ActivityIndicator, AsyncStorage } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

// Actions
import { readGame } from '../../store/actions/GameActions';

// Components
import GameCard from '../../components/GameCard';

// Styling
import Colors from '../../constants/Colors';
import MainStyleSheet from '../../styles/MainStyleSheet';

// Misc.
import { app_uri } from '../../constants/env';

const HomeScreen = props => {
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
	const [games, setGames] = useState([]);

	/* -------------------- *\
	|  3. Selectors          |
	\* -------------------- */

	/* -------------------- *\
	|  4. Effects            |
	\* -------------------- */

	useEffect(() => {
		setLoading(true);

		AsyncStorage.getItem('current_user').then((value) => {
			console.log('Current User:');
			console.log(value);
		});

		axios.get(app_uri + '/api/games/get').then((response) => {
			if (response.data['success'] == true) {
				setGames(response.data['games']);
				setLoading(false);
			} else {
				Alert.alert('Error', response.data['error']);
				setLoading(false);
			}
		}).catch((error) => {
			setLoading(false);
			console.log('[ERROR] - Error while getting games');
			console.log(error);
		});
	}, []);

	/* -------------------- *\
	|  5. Functions          |
	\* -------------------- */

	const gameCardPress = (game_id) => {
		dispatch(readGame(game_id));
		props.navigation.navigate('GameDetails');
	};

	const renderGameCards = () => {
		return games.map((game) => {
			return (
				<GameCard key={game.id} game_id={game.id} cover_image={game.cover_image} title={game.title} onPress={gameCardPress} />
			);
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
			<View style={{...MainStyleSheet.container, flex: 1, paddingHorizontal: 24}}>
				<ScrollView style={styles.scrollView}>
					{renderGameCards()}
				</ScrollView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	scrollView: {
		paddingTop: 64,
		overflow: 'visible' 
	}
});

export default HomeScreen;