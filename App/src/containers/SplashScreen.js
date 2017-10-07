import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  Image
} from "react-native"

export default class SplashScreen extends Component {

  setTimePassed = async () => {
    let loggedIn = await AsyncStorage.getItem("auth-key");
    if (loggedIn) {
      this.props.navigation.navigate("List");
    } else {
      this.props.navigation.navigate("LoginScreen");
    }
  };

  componentWillMount() {
    setTimeout(() => {
      this.setTimePassed();
    },3000);
  }

  render() {
    return (
      <Image
        style={styles.backgroundImage}
        source={{uri: 'http://res.cloudinary.com/hiuj1tri8/image/upload/v1507405497/taxi-background_wh5tqt.jpg'}}
      >
        <View style={styles.container}>
          <Text
            style={{position:'absolute',left:50,top:260,fontSize: 29, alignItems: "center",
            justifyContent: "center",zIndex: 9999, color: '#fff', fontWeight: 'bold' }} >HAcker-Cab-TracKer
          </Text>

        </View>
      </Image>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  backgroundImage: {
    flex: 1,
    height: window.height,
    width: window.width,
    flexDirection: 'column'
  },
  title:{
    flex: 1,
    position:'absolute',
    top:100,
    fontSize: 20,
    padding: 60,
    width:500,
    alignItems: "center",
    justifyContent: "center"
  },
  icon:{
    flex: 1
  }
})

