import React, { Component, PropTypes } from 'react';
import { Constants } from 'expo';
import { View } from 'react-native';
import {
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete'; // 1.2.12

export default class GooglePlacesInput extends Component {
  render() {
    const { setLocation } = this.props
    return (
      <View style={{flex: 1}}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed="auto" // true/false/undefined
          fetchDetails={true}
          renderDescription={row => row.description} // custom description render
          onPress={(data, details = null) => setLocation(data, details)}
          getDefaultValue={() => {
            return ''; // text input default value
          }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyC2QhtACfVZ2cr9HVvxQuzxd3HT36NNK3Q',
            language: 'en', // language of the results
            types: '(cities)', // default: 'geocode'
          }}
          styles={{
            description: {
              fontWeight: 'bold',
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
          currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
          nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
            types: 'food',
          }}
          filterReverseGeocodingByTypes={[
            'locality',
            'administrative_area_level_3',
          ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          debounce={200}
        />
      </View>
    );
  }
}

GooglePlacesInput.propTypes = {
 setLocation: PropTypes.func.isRequired
}
