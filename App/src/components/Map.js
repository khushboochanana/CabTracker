import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
} from "react-native";
import get from 'lodash/get';

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
            markers: [],
            watchPosition: {
                latitude: 1.22,
                longitude: 2.11
            }
        }
    }

    componentDidMount() {
        var mates = get(this.props, 'navigation.state.params.mates');
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

        console.log("markers >>>>> ", markers);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                var region = {...this.state.region};
                region.latitude = position.coords.latitude;
                region.longitude = position.coords.longitude;
                this.setState({region, markers});
            },
            (error) => this.setState({}),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );

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
                         showsUserLocation={true} followsUserLocation={true} showsMyLocationButton={true}>

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

