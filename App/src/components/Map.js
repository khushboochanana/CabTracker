import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
} from "react-native"

import MapView from 'react-native-maps';

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            region: {
                "latitude": 28.617927832148517,
                "latitudeDelta": 1.5881326098174604,
                "longitude": 77.0268389582634,
                "longitudeDelta": 1.4802477881312228
            },
            lines: [],
            watchPosition: {
                latitude: 1.22,
                longitude: 2.11
            }
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("position >>>>>>>>>", position);
                var region = this.state.region;
                region.latitude = position.coords.latitude;
                region.longitude = position.coords.longitude;
                var lines = this.state.lines;
                lines.push({latitude: position.coords.latitude, longitude: position.coords.longitude})
                this.setState({region, lines});
            },
            (error) => this.setState({}),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );

        // navigator.geolocation.watchPosition(
        //     (position) => {
        //
        //         console.log("watchPosition called >>>>>>>>>", position);
        //
        //         var watchPosition = this.state.watchPosition;
        //         watchPosition.latitude = position.coords.latitude;
        //         watchPosition.longitude = position.coords.longitude;
        //
        //         var lines = [...this.state.lines];
        //         lines.push({latitude: position.coords.latitude, longitude: position.coords.longitude})
        //         this.setState({watchPosition, lines})
        //     },
        //     (error) => this.setState({}),
        //     {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        // );


    }


    onRegionChange = (region) => {
        console.log("onRegionChange called >>>>", region);

        // var lines = [...this.state.lines];
        // lines.push({latitude: region.latitude, longitude: region.longitude})
        // this.setState({region, lines});

        this.setState({region});
    }


    render() {
        return (
            <View style={{flex: 1, marginTop: 25}}>
                <MapView style={{flex: 1}}
                         region={this.state.region}
                         onRegionChange={this.onRegionChange}
                         showsUserLocation={true} followsUserLocation={true} showsMyLocationButton={true}>

                    <MapView.Polyline
                        coordinates={this.state.lines}
                        strokeWidth={4}
                    />

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

