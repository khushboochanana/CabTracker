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
      location: ''
    }
  }

  componentWillMount = async () => {
    let data
    if (!this.props.user.user) {
      data = JSON.parse(await AsyncStorage.getItem("auth-key"))
    } else {
      data = this.props.user.user
    }
    this.setState({
      data: data
    })
  }

  logout = () => {
    AsyncStorage.removeItem("auth-key")
    this.props.navigation.navigate("LoginScreen");
  }

  location = (data, details) => {
    this.setState({
      location: {
        address: details.formatted_address,
        latlng: details.geometry.location
      }
    })
  }

  save = () => {
    const userData = {
      email: this.state.data.user.email,
      name: this.state.data.user.name,
      image: this.state.data.user.photoUrl,
      location: {
        latitude: this.state.location.latlng.lat,
        longitude: this.state.location.latlng.lng,
        name: this.state.location.address
      },
      phoneNumber: this.state.phoneNumber,
    }

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
  }

  render () {
    const userForm = this.state.data && this.state.data.user ? (
      <View style={{flex: 1}}>
        <Image
          style={{width: 150, height: 150, borderRadius: 75}}
          source={{uri: this.state.data.user.photoUrl}}
        />
        <Text>{this.state.data.user.name}</Text>
        <Text>{this.state.data.user.email}</Text>
        <Text>Location: </Text>
        <GooglePlacesInput setLocation={this.location}/>
        <View>
          <Text>Phone number: </Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(number) => this.setState({phoneNumber: number})}
            value={this.state.phoneNumber}
          />
        </View>
        <TouchableHighlight style={styles.saveButton} onPress={this.save}>
          <Text style={{color: "#ffffff", fontSize: 16}}>Save</Text>
        </TouchableHighlight>
      </View> ) : (
      <View>
        <Text>Oops Something went wrong</Text>
      </View>
    )

    return (
      <ScrollView style={styles.container}>
        <TouchableHighlight style={styles.logOutButton} onPress={this.logout}>
          <Text style={{color: "#ffffff", fontSize: 16}}>Logout</Text>
        </TouchableHighlight>
        {userForm}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logOutButton: {

  },
  saveButton: {

  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  setDetails: (value) => dispatch(setDetails(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsForm)


