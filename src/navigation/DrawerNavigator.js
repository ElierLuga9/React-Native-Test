import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import UsersScreen from '../screens/UsersScreen';
import HomeScreen from '../screens/HomeScreen';
import UserDetailScreen from '../screens/UserDetailScreen';
import Colors from '../theme/Colors';
import Images from '../theme/Images';

const Drawer = createDrawerNavigator();

const CustomDrawer = ({navigation}) => {
  return (
    <View style={{flex: 1, paddingTop: 100, backgroundColor: Colors.appColor2, alignItems: 'center'}}>
      <Image source={Images.logo} style={{width: 80, height: 80, marginBottom: 30}} />
      <TouchableOpacity title="Main" onPress={() => navigation.navigate('Home')} style={styles.itemStyle}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity title="Main" onPress={() => navigation.navigate('Users')} style={[styles.itemStyle, styles.noBorder]}>
        <Text>Users</Text>
      </TouchableOpacity>
    </View>
  );
};


class DrawerNavigator extends React.Component {
  render() {
    return (
      <Drawer.Navigator
        //drawerType="front"
        initialRouteName="Home"
        drawerStyle={{ width: '60%' }}
        drawerContent={props => CustomDrawer(props)}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Users" component={UsersScreen} />
        <Drawer.Screen name="UserDetail" component={UserDetailScreen} />
      </Drawer.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  itemStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomColor: 'white',
    borderBottomWidth: 0.8,
    paddingTop: 20,
    justifyContent: 'center',
    width: '90%',
  },

  noBorder: {
    borderBottomWidth: 0
  }

})


export default DrawerNavigator;
