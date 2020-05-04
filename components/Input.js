// Main Libraries
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// Actions


// Components


// Styling
import MainStyleSheet from '../styles/MainStyleSheet';
import Colors from '../constants/Colors';

const Input = props => {
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
		<TextInput placeholderTextColor={'#6a6a6a'} onChangeText={props.onTextChange} placeholder={props.placeholder} value={props.value} style={{...styles.input, ...props.textStyles}} multiline={props.multiline} {...props} />
	);
};

const styles = StyleSheet.create({
	input: {
		width: '100%',
		borderBottomColor: Colors.primary,
		borderBottomWidth: 4,
		backgroundColor: Colors.lightBackground,
		marginVertical: 6,
		paddingHorizontal: 8,
		paddingVertical: 12,
		fontSize: 16,
		borderRadius: 8,
		fontFamily: 'montserrat-light'
	}
});

export default Input;