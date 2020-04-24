import React from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, Modal, View, TouchableWithoutFeedback} from 'react-native'

import data from '../../../data/all.json'
import NimblePicker from './nimble-picker'

import {PickerPropTypes} from '../../utils/shared-props'
import {PickerDefaultProps} from '../../utils/shared-default-props'

const styles = StyleSheet.create({
  emojiMartBackdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    ...StyleSheet.absoluteFillObject,
  },
  emojiMartPickerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
  },
})

export default class ModalPicker extends React.PureComponent {
  static propTypes /* remove-proptypes */ = {
    ...PickerPropTypes,
    isVisible: PropTypes.bool,
  }
  static defaultProps = {
    ...PickerDefaultProps,
    data,
    isVisible: false,
  }

  render() {
    var {onPressClose, isVisible} = this.props

    if (!isVisible) {
      return null
    }

    return (
      <Modal
        transparent={true}
        onRequestClose={onPressClose}
        visible={isVisible}
      >
        <View style={styles.emojiMartPickerContainer}>
          <TouchableWithoutFeedback
            onPress={onPressClose}
            style={styles.emojiMartBackdrop}
          >
            <View style={styles.emojiMartBackdrop} />
          </TouchableWithoutFeedback>
          <NimblePicker showCloseButton {...this.props} {...this.state} />
        </View>
      </Modal>
    )
  }
}
