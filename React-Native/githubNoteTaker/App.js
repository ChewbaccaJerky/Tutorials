import Main from "./App/Components/Main";

import React from 'react';
import { StyleSheet, Text, View, NavigatorIOS } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default class App extends React.Component {
  render() {
    return (
      <NavigatorIOS 
        style={styles.container}
        initialRoute = {{
          title: "Github Note Taker",
          component: "Main"
        }}
      />
    );
  }
}
