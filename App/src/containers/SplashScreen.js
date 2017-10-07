import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
        Image
} from "react-native"

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
  }

  setTimePassed = () => {
    let loggedIn = AsyncStorage.getItem("auth-key")
    if (loggedIn) {
      this.props.navigation.navigate("UserDetailsForm");
    } else {
      this.props.navigation.navigate("LoginScreen");
    }
  }

  componentWillMount() {
    setTimeout(() => {
      this.setTimePassed();
    },15000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.backgroundImage} source={{uri: 'http://res.cloudinary.com/hiuj1tri8/image/upload/v1507400562/sampleMap_ccu0rv.jpg'}}>
          <Text style={styles.title} >HAcker-Cab-TracKer</Text>
          <Image
                  style={{position:'absolute',width:150,height:150,left:50}}
                  source={{uri: 'http://res.cloudinary.com/hiuj1tri8/image/upload/v1507387195/cab_snwgzs.png'}}
          />
        </Image>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    opacity:.8,
    backgroundColor: 'transparent'

  },
  title:{
    flex: 1,
    fontSize: 20,
    marginTop: 110,
    padding: 60,
    width:500,
    alignItems: "center",
    justifyContent: "center"

  },
  icon:{
    flex: 1
    }
})

