// Main Libraries
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Actions


// Components


// Styling
import MainStyleSheet from '../styles/MainStyleSheet';
import Colors from '../constants/Colors';

const GameCard = props => {
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

	/* -------------------- *\
	|  6. Render             |
	\* -------------------- */

	return (
		<TouchableWithoutFeedback onPress={props.onPress.bind(this, props.game_id)}>
			<View style={{...MainStyleSheet.container, ...styles.card}}>
				<View style={{...MainStyleSheet.row, padding: 0}}>
					<View style={{...MainStyleSheet.colTwoFifths, padding: 0}}>
						<Image source={{uri: props.cover_image}} style={styles.image} />
					</View>

					<View style={{...MainStyleSheet.colThreeFifths, justifyContent: 'center', padding: 16}}>
						<Text style={MainStyleSheet.headingThree}>{props.title}</Text>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#fafafa',
		marginVertical: 12,
		shadowColor: '#2a2a2a',
		shadowOpacity: 0.25,
		shadowRadius: 4,
		shadowOffset: {
			width: 0,
			height: 4
		},
		elevation: 4,
		padding: 0
	},
	image: {
		height: 200,
		overflow: 'hidden',
		resizeMode: 'cover' 
	}
});

export default GameCard;