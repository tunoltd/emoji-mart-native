import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Modal, View, TouchableWithoutFeedback } from 'react-native'

import data from '../../../data/all.json'
import NimblePicker from './nimble-picker'

import { PickerPropTypes } from '../../utils/shared-props'
import { PickerDefaultProps } from '../../utils/shared-default-props'

const styles = StyleSheet.create({
  emojiMartBackdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  emojiMartPickerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
})

export default class ModalPicker extends React.PureComponent {
  static propTypes = {
    ...PickerPropTypes,
    isVisible: PropTypes.bool,
  }
  static defaultProps = {
    ...PickerDefaultProps,
    data,
    isVisible: false,
  }

  render() {
    var { onPressClose, isVisible } = this.props

    if (!isVisible) {
      return null
    }

    return (
      <Modal
        transparent={true}
        onRequestClose={onPressClose}
        visible={isVisible}
      >
        <TouchableWithoutFeedback
          onPress={onPressClose}
          style={styles.emojiMartBackdrop}
        >
          <View style={styles.emojiMartBackdrop} />
        </TouchableWithoutFeedback>
        <View style={styles.emojiMartPickerContainer}>
          <NimblePicker showCloseButton {...this.props} {...this.state} />
        </View>
      </Modal>
    )
  }
}
