import React from 'react';
import { StackNavigator } from 'react-navigation';

import LoginScreen from "./LoginScreen";
import UserDetailsForm from "./UserDetailsForm";
import List from "../components/List"
import Map from "../components/Map"
import SplashScreen from "./SplashScreen"

const stackNav = {
  Splash : {
    screen : SplashScreen,
    navigationOptions : {
      header: null
    }
  },
  LoginScreen : {
    screen : LoginScreen,
    navigationOptions : {
      header: null
    }
  },
  List : {
    screen : List,
    navigationOptions : {
      header: null
    }
  },
  UserDetailsForm : {
    screen : UserDetailsForm,
    navigationOptions : {
      header: null
    }
  },
  Map : {
    screen : Map,
    navigationOptions : {
      header: null
    }
  }
}

export default StackNavigator(stackNav, {initialRouteName : "Splash" });