// Main Libraries
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Actions


// Components


// Styling
import MainStyleSheet from '../styles/MainStyleSheet';
import Colors from '../constants/Colors';

const EventCard = props => {
	/* --------------------- *\
	|  Component              |
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

	/* -------------------- *\
	|  3. Selectors          |
	\* -------------------- */

	/* -------------------- *\
	|  4. Effects            |
	\* -------------------- */

	/* -------------------- *\
	|  5. Functions          |
	\* -------------------- */

	const months = ["Jan.", "Feb.", "Mar.","Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];

	const renderDateTime = () => {
		var t = props.datetime.split(/[- :]/);
		var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);

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

		let formatted_date = months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() + " at " + time;
		return formatted_date;
	};

	/* -------------------- *\
	|  6. Render             |
	\* -------------------- */

	return (
		<View style={{...MainStyleSheet.container, ...styles.card}}>
			<View style={{...MainStyleSheet.row, padding: 0}}>
				<View style={MainStyleSheet.colOne}>
					<Text style={{...MainStyleSheet.headingTwo, marginBottom: 2}}>{props.title}</Text>
					<Text style={{...MainStyleSheet.text, marginBottom: 12}}>{props.game}</Text>
					<Text style={{...MainStyleSheet.text, marginBottom: 4}}>{props.location}</Text>
					<Text style={{...MainStyleSheet.text, marginBottom: 12}}>{renderDateTime()}</Text>
					<Text style={{...MainStyleSheet.text}}>{props.type}</Text>
					
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#fafafa',
		borderBottomColor: '#f0f0f0',
		borderBottomWidth: 2,
		padding: 32
	}
});

export default EventCard;