import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';

import AppWithNavigationState from './src/AppWithNavigationState';
import rootReducer from './src/reducers/index';
import createStore from './src/store/index';
var store = createStore(rootReducer);

export default () => (
  <Provider store={store}>
    <AppWithNavigationState />
  </Provider>
);