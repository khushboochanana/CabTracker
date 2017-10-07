import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  AsyncStorage,
  Image
} from "react-native"
import { connect } from 'react-redux';

class UserDetailsForm extends Component {
  constructor(props) {
    super(props);
  }

  logout = () => {
    AsyncStorage.removeItem("auth-key")
    this.props.navigation.navigate("LoginScreen");
  }

  render () {

    let { user } = this.props

    if (!user.user) {
      user = AsyncStorage.getItem("auth-key")
    }

    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.goggleLoginButton} onPress={this.logout}>
          <Text style={{color: "#ffffff", fontSize: 16}}>Logout</Text>
        </TouchableHighlight>
        <View>
          <Image
            style={{width: 150, height: 150, borderRadius: 75}}
            source={{uri: `${user.photoUrl}`}}
          />
          <Text>Name: {user.name}</Text>
          <Text>Email: {user.email}</Text>
          <Text>Location: </Text>
          <Text>Phone number: </Text>
        </View>


        <Text>Detail Page----</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  getDetails: () => (dispatch(getDetails())),
  setDetails: (value) => dispatch(setDetails(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsForm)


