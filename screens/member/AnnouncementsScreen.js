// System Libraries
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, Alert, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

// Actions

// Components
import AnnouncementCard from '../../components/AnnouncementCard';

// Styling
import Colors from '../../constants/Colors';
import MainStyleSheet from '../../styles/MainStyleSheet';

// Misc.
import { app_uri } from '../../constants/env';

const AnnouncementsScreen = props => {
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

	const [announcements, setAnnouncements] = useState([]);
	const [loading, setLoading] = useState(false);

	/* -------------------- *\
	|  3. Selectors          |
	\* -------------------- */

	/* -------------------- *\
	|  4. Effects            |
	\* -------------------- */

	useEffect(() => {
		setLoading(true);

		axios.get(app_uri + '/api/announcements/get').then((response) => {
			if (response.data['success'] == true) {
				setLoading(false);
				setAnnouncements(response.data['announcements']);
				console.log(response.data['announcements']);
			} else {
				setLoading(false);
				console.log(response.data['error']);
			}
		}).catch((error) => {
			setLoading(false);
			console.log(error);
		});
	}, []);

	/* -------------------- *\
	|  5. Functions          |
	\* -------------------- */

	const renderAnnouncements = () => {
		return announcements.map((a) => {
			return (
				<AnnouncementCard key={a.announcement.id} title={a.announcement.title} game={a.game.title} description={a.announcement.description} datetime={a.announcement.created_at} />
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
					{renderAnnouncements()}
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

export default AnnouncementsScreen;