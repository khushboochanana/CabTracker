import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
} from "react-native";
import get from 'lodash/get';

import MapView from 'react-native-maps';

const io = require('socket.io-client');

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.socket = io('http://10.1.2.34:9000');
        this.state = {
            pickup: false,
            region: {
                "latitude": 28.617927832148517,
                "latitudeDelta": 0.922,
                "longitude": 77.0268389582634,
                "longitudeDelta": 0.0922
            },
            lines: [],
            markers: [],
            watchPosition: {
                latitude: 1.22,
                longitude: 2.11
            }
        }
    }



    componentDidMount() {
        var mates = get(this.props, 'navigation.state.params.mates');
        var cabId = get(this.props, 'navigation.state.params.user.cabId');
        var user = get(this.props, 'navigation.state.params.user');

        if (!mates) {
            mates = []
        }
        var markers = mates.map((mate, index) => {
            var marker = {};
            marker.title = mate.name;
            marker.description = mate.location.name;
            marker.latlng = {
                "latitude": mate.location.latitude,
                "longitude": mate.location.longitude,
            }
            return marker;
        });

        console.log("markers >>>>> ", cabId, markers);

        this.setState({markers});


        var self = this;

        this.socket.on('connect', () => {
            console.log('connected', user.email);
            this.socket.emit('joined', {data: {cabId, sender: user._id}});

            let emitPickup = (data) => {
                console.log("emitPickup", data);
                this.socket.emit("pickUp", {
                    data: data
                });
            }

            this.socket.on('updateLocation', (data) => {
                console.log('updateLocation', user.email, user._id);
                console.log("data", user.email, data, user._id);

                const socket = this.socket;

                if (data.data.sender == user._id) {
                    console.log(">in if .............", user._id)


                    let getlocation = () => {
                        console.log("getlocation called")
                        navigator.geolocation.getCurrentPosition(
                            (position) => {

                                console.log("======", position)

                                var region = {...self.state.region};
                                region.latitude = position.coords.latitude;
                                region.longitude = position.coords.longitude;

                                // self.socket.emit("pickUp", {
                                //     data: {
                                //         cabId,
                                //         latitude: region.latitude,
                                //         longitude: region.longitude,
                                //         sender: user._id
                                //     }
                                // });


                                emitPickup({
                                    cabId,
                                    latitude: region.latitude,
                                    longitude: region.longitude,
                                    sender: user._id
                                })

                                self.setState({region, pickup: true});


                                setTimeout(() => {
                                    getlocation();
                                }, 1000)
                            },
                            (error) => {
                                console.log("error", error)

                                setTimeout(() => {
                                    getlocation();
                                }, 2000)
                            },
                            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
                        );
                    }

                    getlocation()

                    // setInterval(() => {
                    //     console.log("Setinterval called >>>>", )
                    //
                    // }, 1000)

                } else {
                    console.log(">in Elseee .............", user._id, data.data)


                    if (data.data && data.data.latitude && data.data.longitude) {
                        console.log(">>>>>>>>>>>>>1")
                        var region = {...self.state.region};
                        region.latitude = data.data.latitude;
                        region.longitude = data.data.longitude;
                        self.setState({region, pickup: true});
                    }

                }
            })
        })


    }


    onRegionChange = (region) => {
        // console.log("onRegionChange called >>>>", region);
        // this.setState({region});
    }


    render() {
        return (
            <View style={{flex: 1, marginTop: 25}}>
                <MapView style={{flex: 1}}
                         region={this.state.region}
                         onRegionChange={this.onRegionChange}
                         showsUserLocation={this.state.pickup} followsUserLocation={this.state.pickup}>

                    {this.state.markers.map((marker, index) => (
                        <MapView.Marker
                            key={index}
                            coordinate={marker.latlng}
                            title={marker.title}
                            description={marker.description}
                        />
                    ))}

                </MapView>
                <View style={{alignItems: "center"}}>
                    <Text>Hello watchPosition World {this.state.watchPosition.latitude}
                        : {this.state.watchPosition.longitude}</Text>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

