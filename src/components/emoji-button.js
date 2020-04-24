import React from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native'

const emojiIcon = require('../assets/emoji-icon.png')

const styles = StyleSheet.create({
  emojiButton: {
    width: 18,
    height: 18,
  },
})

export default class EmojiButton extends React.PureComponent {
  static propTypes /* remove-proptypes */ = {
    onButtonPress: PropTypes.func,
    buttonImage: PropTypes.oneOfType([
      PropTypes.shape({
        uri: PropTypes.string,
      }),
      PropTypes.number,
    ]),
  }

  static defaultProps = {
    onButtonPress: () => {},
    buttonImage: emojiIcon,
  }

  render() {
    const {buttonImage} = this.props

    return (
      <TouchableOpacity onPress={this.props.onButtonPress}>
        <Image style={styles.emojiButton} source={buttonImage} />
      </TouchableOpacity>
    )
  }
}
