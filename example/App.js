/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Button, Picker } from 'react-native'
import {
  Emoji,
  NimblePicker,
  EmojiButton,
  ModalPicker,
} from 'emoji-mart-native'
import data from 'emoji-mart-native/data/all.json'
import dataRequires from 'emoji-mart-native/data/local-images/all'

const { emojis: localEmojis } = dataRequires
export default class App extends Component {
  state = {
    set: 'twitter',
    selectedEmoji: 'santa',
    showEmojiPicker: false,
  }
  emojiSelectTrigger = (emoji) => {
    this.setState({ selectedEmoji: emoji })
  }

  showPickerTrigger = (visible) => {
    this.setState({ modalVisible: visible })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Emoji Mart Native</Text>
        <ModalPicker
          isVisible={this.state.modalVisible}
          showCloseButton={true}
          onPressClose={() => {
            this.showPickerTrigger(false)
          }}
          set={this.state.set}
          data={data}
          onSelect={this.emojiSelectTrigger}
          useLocalImages={localEmojis}
        />

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
        <Emoji
          emoji={this.state.selectedEmoji}
          set={this.state.set}
          skin={this.state.selectedEmoji.skin}
          size={64}
          fallback={(emoji) => {
            return `:${emoji.short_names[0]}:`
          }}
        />
        <NimblePicker
          set={this.state.set}
          data={data}
          onSelect={this.emojiSelectTrigger}
          useLocalImages={localEmojis}
        />
        <View style={{ flexDirection: 'row' }}>
          <Text>Open picker as modal </Text>
          <EmojiButton
            onButtonPress={() => {
              this.showPickerTrigger(true)
            }}
          />
        </View>
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
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})
