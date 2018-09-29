import React from 'react'
import PropTypes from 'prop-types'
import { Picker, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  Picker: {
    height: 50,
    width: 250,
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
      <Picker
        selectedValue={this.props.selectedValue}
        style={styles.Picker}
        onValueChange={this.props.onValueChange}
      >
        <Picker.Item label="Apple" value="apple" />
        <Picker.Item label="Facebook" value="facebook" />
        <Picker.Item label="Google" value="google" />
        <Picker.Item label="Messenger" value="messenger" />
        <Picker.Item label="Twitter" value="twitter" />
      </Picker>
    )
  }
}
