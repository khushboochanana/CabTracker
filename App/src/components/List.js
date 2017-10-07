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

import Expo, {Permissions, Notifications} from 'expo';


async function registerForPushNotificationsAsync(id, pushToken) {
    const {status: existingStatus} = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    if (existingStatus === 'granted' && pushToken) {
        return;
    }
    const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
    if (finalStatus !== 'granted') {
        return;
    }
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    fetch(`http://10.1.2.34:9000/user/${id}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            pushToken: token
        }),
    }).then((response) => {
        return response.json();
    }).then((responseData) => {
        console.log("ResponseDate >>>>>0, ", responseData)
    });

    return
}

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notification: '',
            user: {
                "_id": "59d8b8905a02b0d59858caf2",
                "name": "Rajesh",
                "email": "rajesh@tothenew.com",
                "provider": "google",
                "googleId": "123",
                "pushToken": "dffsfsdfsa",
                "location": {
                    "address": "",
                    "longitude": 0,
                    "latitude": 0
                },
                "cabId": "cab1",
                "image": {},
                "phoneNumber": 9953989490
            },
            users: [
                {
                    name: "Rajesh panwar",
                    email: "rajesh@tothenew.com",
                    present: true
                },
                {
                    name: "Rajesh panwar 1",
                    email: "rajesh@tothenew.com",
                    present: true
                },
                {
                    name: "Rajesh panwar 2",
                    email: "rajesh@tothenew.com",
                    present: false
                },
                {
                    name: "Rajesh panwar 3",
                    email: "rajesh@tothenew.com",
                    present: true
                },
            ]

        }

    }


    async componentDidMount() {
        registerForPushNotificationsAsync(this.state.user._id, this.state.user.pushToken);

        this._notificationSubscription = Notifications.addListener(this._handleNotification);

    }

    componentWillMount() {
        const socket = io('http://192.168.42.238:9000/socket.io/socket.io.js');
        socket.on('connect', () => {
            console.log('connected');
          socket.emit('joined', { data: {cabId: 1 }});
        })
    }

    _handleNotification = (notification) => {
        console.log("==================", notification);

        if (notification && notification.data && notification.data.msg) {
            // this.props.navigation.navigate("Detail", {id : parseInt(notification.data.id)});
            Alert.alert('Notification : ' + notification.data.msg);
        }
    };

    _pickUp = () => {
        fetch(`http://10.1.2.34:9000/user/${this.state.user.cabId}/notification`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: "Notification",
                body: "Pickup Done",
                data: {
                    msg: "Pickup Done herere"
                }
            }),
        }).then((response) => {
            return response.json();
        }).then((responseData) => {
            console.log("ResponseDate >>>>>0, ", responseData)
        });
        socket.emit('pickUp', { data: {cabId: 1, location: '123' }});
    };

    _markAbsent = () => {
        console.log("Absent Today done");
    };

    _keyExtractor = (item, index) => index;

    render() {
        return (
            <View style={{flex: 1}}>
                {/*<Text>Hello World</Text>*/}

                <ScrollView>
                    <View style={{flex: 1}}>
                        <View style={{
                            flex: .3,
                            margin: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 50
                        }}>
                            <View style={styles.logo}>
                                <View style={styles.logoContainer}>
                                    <Image
                                        style={{width: 100, height: 100, borderRadius: 75}}
                                        source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                                    />
                                </View>
                            </View>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                marginBottom: 5
                            }}>{this.state.user.name}</Text>
                            <Text style={{fontSize: 18, fontWeight: "bold"}}>{this.state.user.email}</Text>

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

                                <TouchableHighlight style={styles.button}
                                                    onPress={this._markAbsent}>
                                    <Text style={{color: "#ffff"}}> Absent </Text>
                                </TouchableHighlight>
                            </View>

                        </View>

                        <View style={{margin: 5, borderBottomWidth: 2, width: "100%"}}></View>

                        <View style={{flex: .7}}>

                            <View style={{padding: 5, alignItems: "center", justifyContent: "center"}}>
                                <Text style={{fontSize: 18, fontWeight: "bold"}}>Cab Members Detail</Text>
                            </View>


                            <FlatList
                                data={this.state.users}
                                keyExtractor={this._keyExtractor}
                                renderItem={({item, index}) => <View style={{borderBottomWidth: 1, borderColor: "#ddd"}}
                                                                     key={index}>
                                    <TouchableHighlight style={{flex: 1}}
                                                        onPress={() => navigate("Detail", {id: item.id})}>
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
                                                <Switch accessible={false} value={item.present} onValueChange={() => {
                                                }}></Switch>
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
    }
})

