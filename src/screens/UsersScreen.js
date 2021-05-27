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
  FlatList
} from 'react-native';

import { connect } from 'react-redux';
import actions from '../actions';
import AppStatusBar from '../components/AppStatusBar';
import TopNavBar from '../components/TopNavBar';
import { Status } from '../constants';
import Fonts from '../theme/Fonts'

class UsersScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor() {
    super()
  }

  componentDidMount() {
    this.props.dispatch({
      type: actions.GET_USERS
    });
  }

  componentDidUpdate(prevProps, prevState) {

    // get all users
    if (prevProps.getUsersStatus != this.props.getUsersStatus) {
      if (this.props.getUsersStatus == Status.SUCCESS) {
        this.getUsersSuccess();
      } 
      else if (this.props.registerCustomerStatus == Status.FAILURE) {
        this.onFailure(this.props.errorMessage);
      }      
    }
  }

  onFailure(message) {
    
    
  }

  getUsersSuccess() {
    
  }

  onGoDeatil(user) {

    this.props.navigation.navigate('UserDetail', {user})
  }

  renderItem(user) {
    return <TouchableOpacity style={styles.itemWapper} onPress={() => this.onGoDeatil(user.item)}>
      <View>
        <Text>{user.item.name}</Text>
        <Text>{user.item.phone}</Text>
      </View>
      <View>
        <Text>{user.item.email}</Text>
      </View>
    </TouchableOpacity>
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppStatusBar />
        <SafeAreaView style={{ flex: 1 }}>
          <TopNavBar
            title="Users"
            theme="green"
          />
          <View style={styles.container}>
            <FlatList
              data={this.props.users}
              renderItem={this.renderItem.bind(this)}
              keyExtractor={item => item.id}
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  itemWapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.8
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(UsersScreen);