import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
} from "react-native"

export default class Detail extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Detail Page</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

