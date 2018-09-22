/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Picker } from 'emoji-mart-native';
import Toast, {DURATION} from 'react-native-easy-toast';

type Props = {};
export default class App extends Component<Props> {
  addEmoji = (emoji) => {
     this.refs.toast.show(emoji.id);
  }
  render() {
    return (
      <View style={styles.container}>
        <Picker set='emojione' onSelect={this.addEmoji} />
        <Toast ref="toast"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
