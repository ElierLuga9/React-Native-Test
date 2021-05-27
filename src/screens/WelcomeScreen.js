import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
  PermissionsAndroid,
  Platform,
  Dimensions
} from 'react-native';

import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen'
import Geolocation from '@react-native-community/geolocation';
import Fonts from '../theme/Fonts'
import moment from 'moment';
import Images from '../theme/Images';
import Texts from '../texts';
import AppStatusBar from '../components/AppStatusBar';
import TopNavBar from '../components/TopNavBar';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';



class WelcomeScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor() {
    super()

    this.state = {
      lat: 0,
      lng: 0
    }
  }

  componentDidMount() {
    this.initLocationService();
    setTimeout(function () {
      SplashScreen.hide();
    }, 1000);
  }


  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  initLocationService() {
    var that = this;

    if (Platform.OS === 'ios') {
      this.callLocation(that);
    } else {
      async function requestLocationPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
            'title': 'Location Access Required',
            'message': 'Driving420 needs to Access your location'
          }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            that.callLocation(that);
          } else {
            // alert("Permission Denied");
          }
        } catch (err) {
          console.warn(err)
        }
      }
      requestLocationPermission();
    }
  }

  callLocation(that) {
    Geolocation.getCurrentPosition(
      (position) => {
        this.updateGeolocation(position.coords.latitude, position.coords.longitude);
      },
      (error) =>
        console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    that.watchID = Geolocation.watchPosition((position) => {
      this.updateGeolocation(position.coords.latitude, position.coords.longitude);
    }
    );
  }

  updateGeolocation(lat, lng) {

    console.log('position', {lat, lng});
    this.setState({ lat, lng })
  }


  onMoveHome() {
    // Move Next Page.
    this.props.navigation.navigate('DrawerScreen');

  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppStatusBar />
        <SafeAreaView style={{ flex: 1 }}>
          <TopNavBar
            title="Welcome"
            theme="green"
            leftButton="back"
            onBack={() => this.onBack()}
          />
          <View style={styles.container}>
            <View style={{ paddingTop: 80, paddingLeft: 60, paddingBottom: 40 }}>
              <Text style={styles.timeText}>{moment().format('dddd, MMMM Do YYYY, h:mm a')}</Text>
            </View>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.mapView}
              ref={ref => (this.mapView = ref)}
              region={{
                latitude: this.state.lat,
                longitude: this.state.lng,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
              }}
            //customMapStyle={generatedMapStyle}
            >
              <Marker
                coordinate={{
                  latitude: this.state.lat,
                  longitude: this.state.lng,
                }}
              />
            </MapView>
            <TouchableOpacity onPress={() => this.onMoveHome()} style={styles.nextButton} >
              <View style={[styles.buttonContainer, styles.outlineButton]}>
                <Text style={[styles.buttonText, styles.blackText]}>{Texts.Next}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },

  timeText: {
    fontFamily: Fonts.arial,
    fontSize: 16
  },
 
  mapView: {
    width: '100%',
    flex: 1,
    borderRadius: 10
  },

  outlineButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },

  nextButton: {
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 60
  }
})


function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);