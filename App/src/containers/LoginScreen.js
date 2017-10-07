import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableHighlight,
  Image,
  ScrollView,
  AsyncStorage
} from "react-native";
import Expo from 'expo';

import { getDetails, setDetails } from '../actions/index';

class LoginScreen extends Component {

  signInWithGoogleAsync = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: "6981964509-icr06um0k71sv2g9uelefk9jnkf51k01.apps.googleusercontent.com",
        iosClientId: "6981964509-g8nd0e1ejvjs8qrtoomdcev9r9cmupvo.apps.googleusercontent.com",
        scopes: ['profile', 'email'],
      });
      if (result.type === 'success') {
        AsyncStorage.setItem("auth-key", "true");
        this.props.setDetails(result)
        this.props.navigation.navigate("Detail");
      } else {
        Alert.alert("Google Login Failed")
      }
    } catch(e) {
      return {error: true};
    }
  }

  nativeLogin = async () => {

  }

  render() {
    const {navigate} = this.props.navigation;
   console.log(":::::::::", this.props)

    return (
      <View style={{flex: 1}}>
        <View style={styles.logo}>
          <View style={styles.logoContainer}>
            <Image
              style={{width: 150, height: 150, borderRadius: 75}}
              source={{uri: 'https://goggle.github.io/react/img/logo_og.png'}}
            />
          </View>
        </View>
        <View style={styles.login}>
          <View>
            <TouchableHighlight style={styles.goggleLoginButton} onPress={this.signInWithGoogleAsync}>
              <Text style={{color: "#ffffff", fontSize: 16}}>Login with Google</Text>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.login}>
          <View>
            <TouchableHighlight style={styles.nativeLoginButton} onPress={this.nativeLogin}>
              <Text style={{color: "#ffffff", fontSize: 16}}>User Registration</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  logoContainer: {
    height: 150,
    width: 150,
    borderRadius: 75,
    backgroundColor: 'grey'
  },
  logo: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  login: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  goggleLoginButton: {
    paddingLeft: 60,
    paddingRight: 60,
    borderRadius: 5,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#CD5C5C'
  },
  nativeLoginButton: {
    paddingLeft: 60,
    paddingRight: 60,
    borderRadius: 5,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: 'green'
  },
  skipStep: {
    marginTop: 40,
    padding: 8
  }
})

LoginScreen.defaultProps = {

}

LoginScreen.propTypes = {

}

const mapStateToProps = (state, ownProps) => ({
  user: state.user,
  navigation: state.navigation
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  getDetails: () => (dispatch(getDetails())),
  setDetails: (value) => dispatch(setDetails(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)