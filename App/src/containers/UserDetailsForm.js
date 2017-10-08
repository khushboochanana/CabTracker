import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  AsyncStorage,
  Image,
  TextInput,
  ScrollView,
} from "react-native"
import { connect } from 'react-redux';
import get from 'lodash/get';

import { saveData} from '../actions/index';
import GooglePlacesInput from './../components/Geolocation'
import { setDetails } from '../actions/index';

const SAVE_USER_ENDPOINT = 'http://10.1.2.34:9000/user';

class UserDetailsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      phoneNumber: '',
      location: '',
      error: '',
    }
  }

  componentWillMount = async () => {
    let data;
    const user = get(this.props, 'user.user');
    if (!user) {
      data = JSON.parse(await AsyncStorage.getItem("auth-key"));
    } else {
      data = user;
    }
    this.setState({ data })
  };

  logout = () => {
    AsyncStorage.removeItem("auth-key");
    this.props.navigation.navigate("LoginScreen");
  };

  location = (data, details) => {
    this.setState({
      error: '',
      location: {
        address: details.formatted_address,
        latlng: details.geometry.location
      }
    })
  };

  save = () => {
    const { data, location, phoneNumber } = this.state;
    this.setState({ error: '' });
    const userData = {
      email: get(data, 'user.email'),
      name: get(data, 'user.name'),
      image: get(data, 'user.photoUrl'),
      location: {
        latitude: get(location, 'latlng.lat'),
        longitude: get(location, 'latlng.lng'),
        name: location && location.address
      },
      phoneNumber: phoneNumber,
    };

    if (userData && userData.phoneNumber && userData.location) {
      this.setState({error: ''});
      fetch(SAVE_USER_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      }).then((response)=>{
        return response.json();
      }).then((responseData) => {
        AsyncStorage.setItem("auth-key", JSON.stringify(responseData));
        this.props.setDetails(responseData)
        this.props.navigation.navigate("List");
      });
    } else {
      this.setState({ error: 'Both fields are required.'});
    }
  };

  render () {
    const { data, error } = this.state;
    const userForm = data && data.user ? (
      <View style={styles.base}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.userImage}
            source={{uri: get(data, 'user.photoUrl') || 'http://res.cloudinary.com/hiuj1tri8/image/upload/v1507431020/blank_qprtf9.jpg'}}
          />
        </View>
          <View style={styles.content}>
            <Text style={styles.userName}>{get(data, 'user.name')}</Text>
            <Text style={styles.email}>{get(data, 'user.email')}</Text>
            <View style={styles.geolocation}>
              <View style={{width: 100}}>
                <Text style={styles.location}>Location: </Text>
              </View>
              <GooglePlacesInput
                setLocation={this.location}
              />
            </View>
            <View style={styles.geolocation}>
              <View style={{width: 100}}>
                <Text
                  style={styles.location}
                >Phone number: </Text>
              </View>
              <View style={{
                height: 45,
                width: 255,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 6,
                borderColor: '#c9c9ce'
              }}>
                <TextInput
                  style={styles.textBox}
                  onChangeText={(number) => this.setState({phoneNumber: number, error: ''})}
                  value={this.state.phoneNumber}
                  placeholder='Enter phone number'
                  placeholderTextColor='#a4b2b9'
                  keyboardType='numeric'
                />
              </View>
            </View>
            <View style={{height: 20}}><Text style={{color: '#d24b4b', fontSize: 17, marginTop: 10}}>{error}</Text></View>
            <View style={styles.buttonView}>
              <TouchableHighlight
                style={[styles.logOutButton, styles.saveButton]}
                onPress={this.save}>
                <Text style={styles.buttonText}>
                  Save
                </Text>
              </TouchableHighlight>
            </View>
          </View>
      </View> ) : (
      <View>
        <Text>Oops Something went wrong</Text>
      </View>
    );

    return (
      <ScrollView style={styles.container}>
        <View style={styles.buttonView}>
          <TouchableHighlight
            style={styles.logOutButton}
            onPress={this._logOut}>
            <Text style={styles.buttonText}>
              Logout
            </Text>
          </TouchableHighlight>
        </View>
        {userForm}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 12,
  },
  logOutButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fba800',
    width: 100,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  base: {
    flex:  1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  content: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5
  },
  email: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 30,
  },
  geolocation: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  location: {
    fontSize: 18,
    fontWeight: "700",
  },
  input: {
    width: 210,
  },
  textBox: {
    borderRadius: 11,
    borderWidth: 6,
    height: 40,
    borderColor: '#c9c9ce',
    width: 250,
    paddingLeft: 10,
  },
  saveButton: {
    backgroundColor: '#000',
    marginTop: 40,
    width: 100,
    justifyContent: 'flex-end',
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  setDetails: (value) => dispatch(setDetails(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsForm)


