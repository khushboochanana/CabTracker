import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage
} from "react-native"

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
  }

  setTimePassed = async () => {
    let loggedIn = await AsyncStorage.getItem("auth-key")
    if (loggedIn) {
      this.props.navigation.navigate("List");
    } else {
      this.props.navigation.navigate("LoginScreen");
    }
  }

  componentWillMount() {
    setTimeout(() => {
      this.setTimePassed();
    },1000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Splash Screen</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

