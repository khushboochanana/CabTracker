import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
} from "react-native"

export default class Map extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Map Page</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

