import React from 'react'
import { StyleSheet, View } from 'react-native'

import data from '../../../data/all.json'
import NimblePicker from './nimble-picker'

import { PickerPropTypes, PickerDefaultProps } from '../../utils/shared-props'

const styles = StyleSheet.create({
  emojiMartPickerContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default class Picker extends React.PureComponent {
  static propTypes = PickerPropTypes
  static defaultProps = { ...PickerDefaultProps, data }

  render() {
    return (
      <View style={styles.emojiMartPickerContainer}>
        <NimblePicker {...this.props} {...this.state} />
      </View>
    )
  }
}
