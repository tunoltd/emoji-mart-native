/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {
  Emoji,
  NimblePicker,
  EmojiButton,
  ModalPicker,
} from 'emoji-mart-native'
import data from 'emoji-mart-native/data/all.json'
import dataRequires from 'emoji-mart-native/data/local-images/all'
import { SetPicker } from './components'

const { emojis: localEmojis } = dataRequires
export default class App extends Component {
  state = {
    set: 'twitter',
    selectedEmoji: { id: 'santa' },
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
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Emoji Mart Native</Text>
          <Emoji emoji="department_store" size={16} />
        </View>
        <SetPicker
          selectedValue={this.state.set}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({
              set: itemValue,
              showEmojiPicker: true,
            })
          }
        />
        <ModalPicker
          isVisible={this.state.modalVisible}
          showCloseButton={true}
          onPressClose={() => {
            this.showPickerTrigger(false)
          }}
          set={this.state.set}
          data={data}
          onSelect={(emoji) => {
            this.emojiSelectTrigger(emoji)
            this.showPickerTrigger(false)
          }}
          useLocalImages={localEmojis}
        />
        <View style={styles.previewContainer}>
          <Emoji
            emoji={this.state.selectedEmoji}
            set={this.state.set}
            skin={this.state.selectedEmoji.skin}
            size={64}
            fallback={(emoji) => {
              return `:${emoji.short_names[0]}:`
            }}
          />
          <Text>{this.state.selectedEmoji.id}</Text>
        </View>
        <NimblePicker
          set={this.state.set}
          data={data}
          onSelect={this.emojiSelectTrigger}
          useLocalImages={localEmojis}
        />
        <View style={styles.openModalText}>
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
    paddingTop: 25,
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
  titleContainer: {
    flexDirection: 'row',
  },
  previewContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  openModalText: {
    flexDirection: 'row',
    marginTop: 15,
  },
})
