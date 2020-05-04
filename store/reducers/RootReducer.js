import { combineReducers } from 'redux';

import GameReducer from './GameReducer';
import UserReducer from './UserReducer';

const RootReducer = combineReducers({
	games: GameReducer,
	user: UserReducer
});

export default RootReducer;