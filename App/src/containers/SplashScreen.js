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
        source={{uri: 'http://res.cloudinary.com/hiuj1tri8/image/upload/v1507401707/ThinkstockPhotos-dv1954035_mfqebj.jpg'}}
      >
        <View style={styles.container}>
          <Text
            style={{position:'absolute',left:70,top:280,fontSize: 27, alignItems: "center",
            justifyContent: "center",zIndex: 9999, color: '#fff' }} >HAcker-Cab-TracKer
          </Text>
          <Image
            style={{position:'absolute',width:150,height:150,left:110,top:120}}
            source={{uri: 'http://res.cloudinary.com/hiuj1tri8/image/upload/v1507387195/cab_snwgzs.png'}}
          />
        </View>
      </Image>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    opacity: 0.8,
    backgroundColor: 'black'
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

