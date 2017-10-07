import React from 'react';
import { StackNavigator } from 'react-navigation';

import LoginScreen from "./LoginScreen";
import UserDetailsForm from "./UserDetailsForm";
import List from "../components/List"
import Map from "../components/Map"

const stackNav = {
  Home : {
    screen : LoginScreen
  },
  List : {
    screen : List,
    navigationOptions : {
      title : "Your Scans"
    }
  },
  Detail : {
    screen : UserDetailsForm,
    navigationOptions : {
      title : "Select Items"
    }
  },
  Map : {
    screen : Map
  }
}

export default StackNavigator(stackNav, {initialRouteName : "Home" });