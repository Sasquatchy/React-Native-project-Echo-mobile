/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment} from 'react';
import {
  View,
} from 'react-native';

import AppNav from './pages';

import {Provider} from 'react-redux'
import store from './configureStore';
import {YellowBox} from 'react-native';
YellowBox.ignoreWarnings(['Warning: componentWillReceiveProps is deprecated and will be removed in the next major version.']);


const App = () => {
  return (
    <Provider store = {store}>
    <Fragment>
      <AppNav></AppNav>
    </Fragment>

    </Provider>
  );
};

export default App;
