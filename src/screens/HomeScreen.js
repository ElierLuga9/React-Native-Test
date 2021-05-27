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

import {connect} from 'react-redux';
import AppStatusBar from '../components/AppStatusBar';
import Fonts from '../theme/Fonts'
import Images from '../theme/Images';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class HomeScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor() {
    super()
  }

  componentDidMount() {

  }


  componentWillUnmount() {

  }

  render() {
    return (
      <View style={{flex: 1}}>
        <AppStatusBar />
        <Image source={Images.welcome_bg} style={styles.backgroundImage} />
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.container}>
            <Text style={styles.welcomeTitle}>Welcome Home</Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
  },

  backgroundImage: {
    width: screenWidth,
    height: screenHeight,
    position: 'absolute',
    top: 0,
    left: 0
  },

  welcomeTitle: {
    fontFamily: Fonts.arial,
    fontSize: 18,
    color: 'white'
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

export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen);