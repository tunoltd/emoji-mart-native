import React from 'react'
import PropTypes from 'prop-types'
import {TouchableOpacity, Image} from 'react-native'

const emojiIcon = require('../assets/emoji-icon.png')

export default class EmojiButton extends React.PureComponent {
  static propTypes /* remove-proptypes */ = {
    onButtonPress: PropTypes.func,
    buttonImage: PropTypes.oneOfType([
      PropTypes.shape({
        uri: PropTypes.string,
      }),
      PropTypes.number,
    ]),
    buttonSize: PropTypes.number,
  }

  static defaultProps = {
    onButtonPress: () => {},
    buttonImage: emojiIcon,
    buttonSize: 18,
  }

  render() {
    const {buttonImage, buttonSize} = this.props

    return (
      <TouchableOpacity onPress={this.props.onButtonPress}>
        <Image
          style={{width: buttonSize, height: buttonSize}}
          source={buttonImage}
        />
      </TouchableOpacity>
    )
  }
}
