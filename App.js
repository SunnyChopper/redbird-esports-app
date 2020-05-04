import React, { useState } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import MasterNavigator from './navigation/MasterNavigator';

import RootReducer from './store/reducers/RootReducer';

const store = createStore(RootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'montserrat' : require('./assets/fonts/Montserrat-Regular.ttf'),
    'montserrat-bold' : require('./assets/fonts/Montserrat-Bold.ttf'),
    'montserrat-light' : require('./assets/fonts/Montserrat-Light.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading startAsync={fetchFonts} onFinish={() => { setFontLoaded(true); }} />
    );
  }

  return (
    <Provider store={store}>
      <MasterNavigator />
    </Provider>
  );
}
