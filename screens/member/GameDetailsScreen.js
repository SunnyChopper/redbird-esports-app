// System Libraries
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, Alert, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

// Actions

// Components
import EventCard from '../../components/EventCard';
import AnnouncementCard from '../../components/AnnouncementCard';

// Styling
import Colors from '../../constants/Colors';
import MainStyleSheet from '../../styles/MainStyleSheet';

// Misc.
import { app_uri } from '../../constants/env';

const GameDetailsScreen = props => {
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
	const [announcements, setAnnouncements] = useState([]);
	const [events, setEvents] = useState([]);
  	const [game, setGame] = useState([]);

	/* -------------------- *\
	|  3. Selectors          |
	\* -------------------- */

	const game_id = useSelector(state => state.games.current_id);

	/* -------------------- *\
	|  4. Effects            |
	\* -------------------- */

	useEffect(() => {
		setLoading(true);

		axios.get(app_uri + '/api/games/read?game_id=' + game_id).then((response) => {
			if (response.data['success'] == true) {
				setGame(response.data['game']);

				return axios.get(app_uri + '/api/announcements/get?game_id=' + game_id);
			} else {
				setLoading(false);
			}
		}).then((response) => {
			if (response.data['success'] == true) {
				setAnnouncements(response.data['announcements']);
				
				return axios.get(app_uri + '/api/events/get?game_id=' + game_id);
			} else {
				setLoading(false);
			}
		}).then((response) => {
			if (response.data['success'] == true) {
				setEvents(response.data['events']);
				setLoading(false);
			} else {
				setLoading(false);
			}
		}).catch((error) => {
			console.log(error);
			setLoading(false);
		});
	}, [game_id]);

	/* -------------------- *\
	|  5. Functions          |
	\* -------------------- */

	const renderAnnouncements = () => {
		if (announcements.length > 0) {
			return announcements.map((a) => {
				return (
					<AnnouncementCard key={a.id} title={a.title} description={a.description} datetime={a.created_at} game={game.title} />
				);
			});
		} else {
			return (
				<View style={{...MainStyleSheet.row, backgroundColor: '#d0d0d0', padding: 24}}>
					<View style={MainStyleSheet.colOne}>
						<Text style={{...MainStyleSheet.text, textAlign: 'center'}}>No announcements found.</Text>
					</View>
				</View>
			);
		}
	};

	const renderEvents = () => {
		if (events.length > 0) {
			return events.map((event) => {
				return (
					<EventCard key={event.event.id} title={event.event.title} location={event.event.location} datetime={event.event.event_datetime} type={event.type.type} game={game.title} />
				);
			});
		} else {
			return (
				<View style={{...MainStyleSheet.row, backgroundColor: '#d0d0d0', padding: 24}}>
					<View style={MainStyleSheet.colOne}>
						<Text style={{...MainStyleSheet.text, textAlign: 'center'}}>No events found.</Text>
					</View>
				</View>
			);
		}
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
			<View style={{...MainStyleSheet.container, flex: 1}}>
				<ScrollView style={styles.scrollView}>
					<View style={{...MainStyleSheet.row, justifyContent: 'center', marginBottom: 24}}>
						<View style={MainStyleSheet.colOneHalf}>
							<Image source={{uri: game.cover_image}} style={styles.coverImage} />
						</View>
					</View>

					<View style={{...MainStyleSheet.row, justifyContent: 'center', marginBottom: 8}}>
						<View style={MainStyleSheet.colOne}>
							<Text style={{...MainStyleSheet.headingOne, textAlign: 'center'}}>{game.title}</Text>
						</View>
					</View>

					<View style={{...MainStyleSheet.row, justifyContent: 'center'}}>
						<View style={MainStyleSheet.colOne}>
							<Text style={{...MainStyleSheet.headingThree, marginLeft: 24}}>Announcements</Text>
						</View>
					</View>

					<View style={{...MainStyleSheet.row, justifyContent: 'center', marginBottom: 24}}>
						<View style={MainStyleSheet.colOne}>
							{renderAnnouncements()}
						</View>
					</View>

					<View style={{...MainStyleSheet.row, justifyContent: 'center'}}>
						<View style={MainStyleSheet.colOne}>
							<Text style={{...MainStyleSheet.headingThree, marginLeft: 24}}>Events</Text>
						</View>
					</View>

					<View style={{...MainStyleSheet.row, justifyContent: 'center', marginBottom: 24}}>
						<View style={MainStyleSheet.colOne}>
							{renderEvents()}
						</View>
					</View>
				</ScrollView>
			</View>
		</View>
	);
};

GameDetailsScreen.navigationOptions = navData => {
	return {
		headerTitle: 'Details'
	}
};

const styles = StyleSheet.create({
	scrollView: {
		paddingTop: 32
	},
	coverImage: {
		height: 300,
		width: '100%',
		resizeMode: 'contain'
	}
});

export default GameDetailsScreen;