import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  AsyncStorage,
  Image,
  TextInput
} from "react-native"
import { connect } from 'react-redux';
import GooglePlacesInput from './../components/Geolocation'

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

  save = () => {
     this.props.saveData()
  }

  render () {

    const userForm = this.state.data && this.state.data.user ? (
      <View>
        <Image
          style={{width: 150, height: 150, borderRadius: 75}}
          source={{uri: this.state.data.user.photoUrl}}
        />
        <Text>{this.state.data.user.name}</Text>
        <Text>{this.state.data.user.email}</Text>
        <View>
          <Text>Location: </Text>
         <GooglePlacesInput />
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(location) => this.setState({location})}
            value={this.state.location}
          />
        </View>
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
      <View style={styles.container}>
        <TouchableHighlight style={styles.logOutButton} onPress={this.logout}>
          <Text style={{color: "#ffffff", fontSize: 16}}>Logout</Text>
        </TouchableHighlight>
        {userForm}
      </View>
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
  saveData: () => (dispatch(saveData())),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsForm)


