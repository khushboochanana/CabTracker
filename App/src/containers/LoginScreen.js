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
} from "react-native";
import Expo from 'expo';

import { getDetails, setDetails } from '../actions/index';

const ID = {
  "android": "6981964509-icr06um0k71sv2g9uelefk9jnkf51k01.apps.googleusercontent.com",
  "ios": "6981964509-g8nd0e1ejvjs8qrtoomdcev9r9cmupvo.apps.googleusercontent.com"
};

const GET_USER_ENDPOINT = 'https://hack-slash-cab.herokuapp.com/user';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      saving: false,
    }
  }

  signInWithGoogleAsync = async () => {
    this.setState({
      loader: true,
      saving: true,
    });
    if (this.state.saving) return;
    let alreadyExists;
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: ID.android,
        iosClientId: ID.ios,
        scopes: ['profile', 'email'],
      });
      if (result && result.type === 'success' && result.user) {
        if ( /@tothenew.com\s*$/.test(result.user.email) ) {
          this.props.setDetails(result);
          let responseData = await fetch(GET_USER_ENDPOINT+`/${result.user.email}`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }).then((response)=>{
            console.log("inside 3")
            return response.json();
          });
          if (responseData && responseData.email) {
            alreadyExists = responseData.email;
            this.props.setDetails(responseData);
            this.props.navigation.navigate("List");
          } else {
            this.props.navigation.navigate("UserDetailsForm");
          }
        } else {
          this.setState({
            loader: false,
            saving: false,
          });
          Alert.alert("Please Login via tothenew id.")
        }
      } else {
        this.setState({
          loader: false,
          saving: false,
        });
        Alert.alert("Something went wrong. Please try again later!")
      }
    } catch(e) {
      Alert.alert("Something went wrong. Please try again later!");
      this.setState({
        loader: false,
        saving: false,
      });
      return { error: true };
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    const { loader } = this.state;
    return (
    <Image
      style={styles.backgroundImage}
      source={{uri: 'http://res.cloudinary.com/hiuj1tri8/image/upload/v1507405497/taxi-background_wh5tqt.jpg'}}
    >
      <View style={{flex: 1}}>
        <View style={styles.logo}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.image}
              source={{uri: 'http://res.cloudinary.com/hiuj1tri8/image/upload/v1507387195/cab_snwgzs.png'}}
            />
          </View>
        </View>
        <View style={styles.login}>
          {!loader ?
            <View>
              <TouchableHighlight
                style={styles.goggleLoginButton}
                onPress={this.signInWithGoogleAsync}
              >
                <Text style={styles.buttonText}>Login with Google</Text>
              </TouchableHighlight>
            </View> :
            <Image
              style={{width: 200, height: 150}}
              source={require('./../assets/loader.gif')}
            />
          }
        </View>
      </View>
    </Image>
    )
  }
}

const styles = StyleSheet.create({
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  logoContainer: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  logo: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  login: {
    flex: 0.5,
    alignItems: 'center',
    marginTop: 30,
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
  },
  backgroundImage: {
    flex: 1,
    height: window.height,
    width: window.width,
    flexDirection: 'column'
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  getDetails: () => (dispatch(getDetails())),
  setDetails: (value) => dispatch(setDetails(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
