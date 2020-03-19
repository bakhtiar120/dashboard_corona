/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';
import Home from './app/views/home';

const App: () => React$Node = () => {
  return (
    <>
    <Home/>
    </>
  );
};


export default App;
