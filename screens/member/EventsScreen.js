// System Libraries
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, Alert, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

// Actions

// Components
import EventCard from '../../components/EventCard';

// Styling
import Colors from '../../constants/Colors';
import MainStyleSheet from '../../styles/MainStyleSheet';

// Misc.
import { app_uri } from '../../constants/env';

const EventsScreen = props => {
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
	const [events, setEvents] = useState([]);

	/* -------------------- *\
	|  3. Selectors          |
	\* -------------------- */

	/* -------------------- *\
	|  4. Effects            |
	\* -------------------- */

	useEffect(() => {
		setLoading(true);

		axios.get(app_uri + '/api/events/get').then((response) => {
			if (response.data['success'] == true) {
				setLoading(false);
				setEvents(response.data['events']);
				console.log(response.data['events']);
			} else {
				setLoading(false);
			}
		}).catch((error) => {
			console.log(error);
			setLoading(false);
		});
	}, []);

	/* -------------------- *\
	|  5. Functions          |
	\* -------------------- */

	const renderEvents = () => {
		return events.map((event) => {
			return (
				<EventCard key={event.event.id} title={event.event.title} location={event.event.location} datetime={event.event.event_datetime} type={event.type.type} game={event.game.title} />
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
			<View style={{...MainStyleSheet.container, flex: 1}}>
				<ScrollView style={styles.scrollView}>
					{renderEvents()}
				</ScrollView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	scrollView: {
		paddingTop: 72
	}
});

export default EventsScreen;