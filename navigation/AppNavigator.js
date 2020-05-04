/* ---------------------- *\
|	Libraries              | 
\* ---------------------- */

import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createSwitchNavigator, createAppContainer} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack'; 
import { Platform, Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';

/* ---------------------- *\
|	Screens                |
\* ---------------------- */

import LoginScreen from '../screens/guest/LoginScreen';
import RegisterScreen from '../screens/guest/RegisterScreen';
import EmailVerificationScreen from '../screens/guest/EmailVerificationScreen';
import HomeScreen from '../screens/member/HomeScreen';
import EventsScreen from '../screens/member/EventsScreen';
import AnnouncementsScreen from '../screens/member/AnnouncementsScreen';
import GameDetailsScreen from '../screens/member/GameDetailsScreen';
import ProfileScreen from '../screens/member/ProfileScreen';

/* ---------------------- *\
|	Constants              |
\* ---------------------- */

import Colors from '../constants/Colors';

/* ---------------------- *\
|	Default Nav Options    |
\* ---------------------- */

const defaultNavOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? Colors.lightBackground : ''
	},
	headerTitleStyle: {
		fontFamily: 'montserrat-bold'
	},
	headerBackTitleStyle: {
		fontFamily: 'montserrat'
	},
	headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};

/* ---------------------- *\
|	Navigators             |
\* ---------------------- */

const GuestNavigator = createSwitchNavigator({
	Login: {
		screen: LoginScreen
	},
	Register: {
		screen: RegisterScreen
	},
	EmailVerification: {
		screen: EmailVerificationScreen
	}
});

const HomeStackNavigator = createStackNavigator({
	Home: {
		screen: HomeScreen,
		navigationOptions: {
			headerShown: false
		}
	},
	GameDetails: {
		screen: GameDetailsScreen
	}
});

const EventsNavigator = createStackNavigator({
	Home: {
		screen: EventsScreen,
		navigationOptions: {
			headerShown: false
		}
	}
});

const AnnouncementsNavigator = createStackNavigator({
	Announcements: {
		screen: AnnouncementsScreen,
		navigationOptions: {
			headerShown: false
		}
	}
});

const ProfileNavigator = createStackNavigator({
	Profile: {
		screen: ProfileScreen,
		navigationOptions: {
			headerShown: false
		}
	}
});

/* ---------------------- *\
|	Tab Bar Config         |
\* ---------------------- */

const homeTabConfig = {
	Home: {
		screen: HomeStackNavigator,
		navigationOptions: ({navigation}) => {
			let { routeName } = navigation.state.routes[navigation.state.index];
			let navigationOptions = {
				tabBarIcon: tabInfo => {
					return (<Ionicons name="ios-paper" size={25} color={tabInfo.tintColor} />);
				},
				tabBarColor: Colors.primary,
				tabBarLabel: Platform.OS === 'android' ? (<Text style={{ fontFamily: 'montserrat' }}>Home</Text>) : ('Home')
			}

			return navigationOptions;
		}
	},
	Events: {
		screen: EventsNavigator,
		navigationOptions: ({navigation}) => {
			let { routeName } = navigation.state.routes[navigation.state.index];
			let navigationOptions = {
				tabBarIcon: tabInfo => {
					return (<Ionicons name="ios-paper-plane" size={25} color={tabInfo.tintColor} />);
				},
				tabBarColor: Colors.primary,
				tabBarLabel: Platform.OS === 'android' ? (<Text style={{ fontFamily: 'montserrat' }}>Home</Text>) : ('Events')
			}

			return navigationOptions;
		}
	},
	Announcements: {
		screen: AnnouncementsNavigator,
		navigationOptions: ({navigation}) => {
			let { routeName } = navigation.state.routes[navigation.state.index];
			let navigationOptions = {
				tabBarIcon: tabInfo => {
					return (<Ionicons name="ios-megaphone" size={25} color={tabInfo.tintColor} />);
				},
				tabBarColor: Colors.primary,
				tabBarLabel: Platform.OS === 'android' ? (<Text style={{ fontFamily: 'montserrat' }}>Announcements</Text>) : ('Announcements')
			}

			return navigationOptions;
		}
	},
	Profile: {
		screen: ProfileNavigator,
		navigationOptions: ({navigation}) => {
			let { routeName } = navigation.state.routes[navigation.state.index];
			let navigationOptions = {
				tabBarIcon: tabInfo => {
					return (<Ionicons name="ios-person" size={25} color={tabInfo.tintColor} />);
				},
				tabBarColor: Colors.primary,
				tabBarLabel: Platform.OS === 'android' ? (<Text style={{ fontFamily: 'montserrat' }}>Profile</Text>) : ('Profile')
			}

			return navigationOptions;
		}
	}
};

const HomeNavigator = Platform.OS === 'android' ? createMaterialBottomTabNavigator(homeTabConfig, {
	activeTintColor: 'white',
	shifting: true,
	barStyle: {
		backgroundColor: Colors.primary
	}
}) : createBottomTabNavigator(homeTabConfig, {
	tabBarOptions: {
		labelStyle: {
			fontFamily: 'montserrat'
		},
		activeTintColor: Colors.primary
	}
});

const MainNavigator = createSwitchNavigator({
	Guest: GuestNavigator,
	Home: HomeNavigator
});

export default createAppContainer(MainNavigator);