import React from 'react';
import { StackNavigator } from 'react-navigation';

import LoginScreen from "./LoginScreen";
import UserDetailsForm from "./UserDetailsForm";
import List from "../components/List"
import Map from "../components/Map"
import SplashScreen from "./SplashScreen"

const stackNav = {
  Splash : {
    screen : SplashScreen
  },
  LoginScreen : {
    screen : LoginScreen,
    navigationOptions : {
      headerLeft: null
    }
  },
  List : {
    screen : List,
    navigationOptions : {
      headerLeft: null
    }
  },
  UserDetailsForm : {
    screen : UserDetailsForm,
    navigationOptions : {
      headerLeft: null
    }
  },
  Map : {
    screen : Map
  }
}

export default StackNavigator(stackNav, {initialRouteName : "Splash" });