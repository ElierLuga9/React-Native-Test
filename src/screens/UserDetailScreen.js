import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,

} from 'react-native';

import { connect } from 'react-redux';
import AppStatusBar from '../components/AppStatusBar';
import TopNavBar from '../components/TopNavBar';
import Fonts from '../theme/Fonts'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

class UserDetailScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props)

    this.state = {
      user: props.route.params.user
    }
  }

  componentDidMount() {
    console.log('compo==================');
  }
  onBack() {
    this.props.navigation.goBack();
  }

  render() {

    const {user} = this.props.route.params;
    return (
      <View style={{ flex: 1 }}>
        <AppStatusBar />
        <SafeAreaView style={{ flex: 1 }}>

          <TopNavBar
            title="User Detail"
            leftButton="back"
            onBack={() => this.onBack()}
          />
          <View style={styles.container}>
            <Text style={[styles.subtitle, styles.text]}>General</Text>
            <View style={styles.item}>
              <Text style={styles.text}>Name</Text>
              <Text style={[styles.text, styles.textItalic]}>{user.name}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.text}>Email</Text>
              <Text style={[styles.text, styles.textItalic]}>{user.email}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.text}>Phone</Text>
              <Text style={[styles.text, styles.textItalic]}>{user.phone}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.text}>Company</Text>
              <Text style={[styles.text, styles.textItalic]}>{user.company.name}</Text>
            </View>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.mapView}
              ref={ref => (this.mapView = ref)}
              region={{
                latitude: Number(user.address.geo.lat),
                  longitude: Number(user.address.geo.lng),
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
              }}
            //customMapStyle={generatedMapStyle}
            >
              <Marker
                coordinate={{
                  latitude: Number(user.address.geo.lat),
                  longitude: Number(user.address.geo.lng),
                }}
              />
            </MapView>
          </View>

        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },

  itemWapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.8
  },
  subtitle: {
    backgroundColor: '#efefef',
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.2
  },
  mapView: {
    width: '100%',
    flex: 1,
    borderRadius: 10
  },
})


function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

function mapStateToProps(state) {
  return {
    users: state.user.users,
    errorMessage: state.user.errorMessage,
    getUsersStatus: state.user.getUsersStatus
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailScreen);