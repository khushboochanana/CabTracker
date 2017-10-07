import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Alert,
    ScrollView,
    FlatList,
    Image,
    Switch
} from 'react-native';
const io = require('socket.io-client');
import get from 'lodash/get';

import Expo, { Permissions, Notifications } from 'expo';

async function registerForPushNotificationsAsync(id, token) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (existingStatus === 'granted' && token) return;
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') return;

    // Get the token that uniquely identifies this device
    let pushToken = await Notifications.getExpoPushTokenAsync();
    if (pushToken) {
      fetch(`http://10.1.20.149:9000/user/${id}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pushToken }),
      }).then(response => {
          console.log("response")
          return response.json();
      }).then(data => {
          console.log("ResponseDate >>>>>", data)
      }).catch(err => {
          console.log("Error>>>>>>>>>>>>>>>>>>>>>>>>>>>>", err);
      });
    }
}

export default class List extends Component {
    constructor(props) {
        super(props);
        this.socket = io('http://192.168.42.238:9000');
        this.state = {
          notification: '',
          user: props && props.user,
          mates: get(props, 'cab.cabMates'),
          cab: get(props, 'cab'),
        }
    }

    async componentDidMount() {
      const { _id, pushToken } = this.state.user;
      registerForPushNotificationsAsync(_id, pushToken);
      this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }

    componentWillMount() {
      const cabId = get(this.state, 'user.cabId');
      if (cabId) {
        this.socket.on('connect', () => {
          console.log('connected');
          this.socket.emit('joined', { data: { cabId }});
        })
      }
    }

    _handleNotification = (notification) => {
      console.log("==================", notification);
      const msg = get(notification, 'data.msg');
      if (msg) {
        // this.props.navigation.navigate("Detail", {id : parseInt(notification.data.id)});
        Alert.alert('Notification : ' + msg);
      }
    };

    _pickUp = () => {
      const { cabId, location } = get(this.state, 'user');
      if (cabId && location) {
          fetch(`http://10.1.2.34:9000/user/${cabId}/notification`, {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  title: "Notification",
                  body: "Pickup Done",
                  data: {
                      msg: "Pickup Done"
                  }
              }),
          }).then(response => {
              return response.json();
          }).then(data => {
              console.log("ResponseDate >>>>>0, ", data)
          }).catch(err => {
              console.log(err, 'Error--')
          });
          this.socket.emit('pickUp', { data: { cabId, location }});
      }
    };

    _markAbsent = (value) => {
      const userId = get(this.state, 'user._id');
      const cabId = get(this.state, 'cab.cabId');
      if (userId && cabId) {
        fetch(`http://10.1.2.34:9000/cab/${cabId}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              presence: value,
              userId,
            }),
          }).then(response => {
              return response.json();
          }).then(data => {
              console.log("ResponseDate >>>>>0, ", data)
          }).catch(err => {
              console.log(err, 'Error--')
          });
      }
    };

    _addDelay = () => {};

    _keyExtractor = (item, index) => index;

    render() {
        const { user, mates } = this.state;
        return (
            <View style={{flex: 1}}>
                <ScrollView>
                    <View style={{flex: 1}}>
                        <View style={styles.base}>
                            <View style={styles.logo}>
                                <View style={styles.logoContainer}>
                                    <Image
                                        style={{width: 100, height: 100, borderRadius: 75}}
                                        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                                    />
                                </View>
                            </View>
                            <Text style={styles.userName}>{user && user.name}</Text>
                            <View style={{flex: .3, alignItems: 'center', justifyContent: 'center'}}>
                                <Switch accessible={false} value={user && user.presence} onValueChange={(value) => { this._markAbsent(value); }}></Switch>
                            </View>
                            <Text style={{fontSize: 18, fontWeight: "bold"}}>{user && user.email}</Text>
                            <View style={{
                                flex: .5,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <TouchableHighlight
                                    style={styles.button}
                                    onPress={this._pickUp}>
                                    <Text style={{color: "#ffff"}}> Pickup Done </Text>
                                </TouchableHighlight>

                                <TouchableHighlight style={styles.button} onPress={this._addDelay}>
                                    <Text style={{color: "#ffff"}}> Delay </Text>
                                </TouchableHighlight>
                            </View>
                        </View>

                        <View style={{margin: 5, borderBottomWidth: 2, width: "100%"}}></View>

                        <View style={{flex: .7}}>
                            <View style={{padding: 5, alignItems: "center", justifyContent: "center"}}>
                                <Text style={{fontSize: 18, fontWeight: "bold"}}>Cab Mates</Text>
                            </View>
                            <FlatList
                                data={mates}
                                keyExtractor={this._keyExtractor}
                                renderItem={({item, index}) => <View style={{borderBottomWidth: 1, borderColor: "#ddd"}} key={index}>
                                    <TouchableHighlight style={{flex: 1}} onPress={() => navigate("Detail", {id: item && item.id})}>
                                        <View style={{flex: 1, flexDirection: "row"}}>
                                            <View style={{flex: .7, flexWrap: 'wrap'}}>
                                                <View style={styles.content}>
                                                    <View><Text style={styles.title}>{item && item.name}</Text></View>
                                                    <View><Text>{item && item.email}</Text></View>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableHighlight>
                                </View>}
                            />
                        </View>
                    </View>
                </ScrollView>


                {/*<Text>{this.state.notification}</Text>

                 <View style={{height: 50, alignItems: "center", justifyContent: "center", padding: 10, margin: 10}}>
                 <Text>{this.state.user.name}</Text>
                 <Text>{this.state.user.email}</Text>
                 </View>

                 <View style={{
                 height: 100,
                 alignItems: "flex-start",
                 height: 50,
                 flexDirection: 'row',
                 justifyContent: "flex-end"
                 }}>
                 <TouchableHighlight style={styles.button}
                 onPress={this._pickUp}>
                 <Text> Pickup Done </Text>
                 </TouchableHighlight>

                 <TouchableHighlight style={styles.button}
                 onPress={this._markAbsent}>
                 <Text> Absent </Text>
                 </TouchableHighlight>
                 </View>

                 <ScrollView>

                 <FlatList
                 data={this.state.users}
                 keyExtractor={this._keyExtractor}
                 renderItem={({item, index}) => <View key={index}>
                 <TouchableHighlight style={{flex: 1}} onPress={() => navigate("Detail", {id: item.id})}>
                 <View style={{flex: 1, flexDirection: "row"}}>
                 <View style={{flex: .7, flexWrap: 'wrap'}}>
                 <View style={styles.content}>
                 <View>
                 <Text style={styles.title}>{index + 1}. {item.name}</Text>
                 </View>
                 <View>
                 <Text>{item.email}</Text>
                 </View>
                 </View>
                 </View>
                 <View style={{flex: .3, alignItems: 'center', justifyContent: 'center'}}>
                 <Text> Present </Text>
                 </View>
                 </View>
                 </TouchableHighlight>
                 </View>}
                 />
                 </ScrollView>*/}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    base: {
        flex: .3,
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
    },
    logoContainer: {
        height: 100,
        width: 100,
        borderRadius: 60,
        backgroundColor: 'grey'
    },
    logo: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    container: {
        flex: 1
    },
    button: {
        padding: 12,
        margin: 5,
        borderRadius: 25,
        backgroundColor: "grey"
    },
    scanbtn: {
        position: "absolute",
        bottom: 20,
        right: 20,
        height: 80,
        width: 80,
        borderRadius: 50
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5
    },
    img: {
        height: 60,
        width: 60,
        backgroundColor: 'grey',
        color: "#fff",
        borderRadius: 10
    },
    content: {
        padding: 8
    },
    listView: {
        height: 80,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: 'grey'
    },
    header: {
        marginTop: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'yellow',
        marginBottom: 2,
        borderBottomWidth: 1,
        borderColor: 'grey'
    },
    headerText: {
        fontSize: 18
    },
    userName: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5
    }
});

