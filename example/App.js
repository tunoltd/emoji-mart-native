/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Button, Picker } from 'react-native'
import { NimblePicker } from 'emoji-mart-native'
import data from 'emoji-mart-native/data/all.json'
import appleDataRequires from './assets/emojis/apple'
import twitterDataRequires from './assets/emojis/twitter'
import googleDataRequires from './assets/emojis/google'
import facebookDataRequires from './assets/emojis/facebook'
import messengerDataRequires from './assets/emojis/messenger'

import Toast, { DURATION } from 'react-native-easy-toast'
export default class App extends Component {
  state = {
    set: 'twitter',
    localEmojis: () => {
      switch (this.state.set) {
        case 'apple':
          return appleDataRequires.emojis
          break
        case 'facebook':
          return facebookDataRequires.emojis
          break
        case 'google':
          return googleDataRequires.emojis
          break
        case 'messenger':
          return messengerDataRequires.emojis
          break
        case 'twitter':
          return twitterDataRequires.emojis
          break
      }
    },
    showEmojiPicker: false,
  }
  addEmoji = (emoji) => {
    this.refs.toast.show(emoji.id)
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible })
  }
  render() {
    let emojiPicker = null
    if (this.state.showEmojiPicker) {
      emojiPicker = (
        <NimblePicker
          set={this.state.set}
          data={data}
          onPressClose={() => {
            this.setState({
              showEmojiPicker: false,
            })
          }}
          onSelect={this.addEmoji}
          useLocalImages={this.state.localEmojis()}
        />
      )
    }

    return (
      <View style={styles.container}>
        {emojiPicker}
        <Text>Welcome To emoji-mart-native example app</Text>
        <Text>Please choose an emoji set: </Text>

        <Picker
          selectedValue={this.state.set}
          style={{ height: 50, width: 250 }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({
              set: itemValue,
              showEmojiPicker: true,
            })
          }
        >
          <Picker.Item label="Apple" value="apple" />
          <Picker.Item label="Facebook" value="facebook" />
          <Picker.Item label="Google" value="google" />
          <Picker.Item label="Messenger" value="messenger" />
          <Picker.Item label="Twitter" value="twitter" />
        </Picker>
        <Toast ref="toast" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
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
})
