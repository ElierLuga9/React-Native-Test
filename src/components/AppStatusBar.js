import React from "react";
import { StatusBar, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "../theme/Colors";


const AppStatusBar = function(props) {
  const insets = useSafeAreaInsets();
  //return <View style={{ height: insets.top, backgroundColor: props.color || Colors.appColor }} />;
  return <View style={{ height: insets.top, backgroundColor: props.color || Colors.appColor }}>
    <StatusBar backgroundColor="transparent" translucent barStyle="light-content"/>
  </View>;
}
export default AppStatusBar
