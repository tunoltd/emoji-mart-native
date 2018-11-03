import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Button, TouchableOpacity, Text } from 'react-native'

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    marginRight: 15,
    marginLeft: 15,
    fontSize: 24,
  },
})

export default class SetPicker extends React.PureComponent {
  static propTypes = {
    onValueChange: PropTypes.func,
    selectedValue: PropTypes.string,
  }

  static defaultProps = { onValueChange: () => {}, selectedValue: 'apple' }

  render() {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.column} onPress={this._onPressButton}>
          <Text>Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.column} onPress={this._onPressButton}>
          <Text>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.column} onPress={this._onPressButton}>
          <Text>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.column} onPress={this._onPressButton}>
          <Text>Messenger</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.column} onPress={this._onPressButton}>
          <Text>Twitter</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
