import React from 'react'
import PropTypes from 'prop-types'
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native'

import {getData, getSanitizedData, unifiedToNative} from '../../utils'
import {uncompress} from '../../utils/data'
import {EmojiPropTypes} from '../../utils/shared-props'
import {EmojiDefaultProps} from '../../utils/shared-default-props'

const styles = StyleSheet.create({
  emojiWrapper: {
    position: 'relative',
    overflow: 'hidden',
  },
  labelStyle: {
    textAlign: 'center',
    color: '#ae65c5',
  },
})

// TODO: Use functional components?
// const NimbleEmoji = (props) => {
class NimbleEmoji extends React.PureComponent {
  static propTypes /* remove-proptypes */ = {
    ...EmojiPropTypes,
    data: PropTypes.object.isRequired,
  }
  static defaultProps = EmojiDefaultProps

  _getData = (props) => {
    const {emoji, skin, set, data} = props
    return getData(emoji, skin, set, data)
  }

  _getPosition = (props) => {
    const {sheet_x, sheet_y} = this._getData(props)

    return {
      x: `-${sheet_x * 100}%`,
      y: `-${sheet_y * 100}%`,
    }
  }

  _getSanitizedData = (props) => {
    const {emoji, skin, set, data} = props
    return getSanitizedData(emoji, skin, set, data)
  }

  _handlePress = (e) => {
    const {onPress} = this.props
    if (!onPress) {
      return
    }
    const emoji = this._getSanitizedData(this.props)

    onPress(emoji, e)
  }

  _handleLongPress = (e) => {
    const {onLongPress} = this.props
    if (!onLongPress) {
      return
    }
    const emoji = this._getSanitizedData(this.props)

    onLongPress(emoji, e)
  }

  render() {
    if (this.props.data.compressed) {
      uncompress(this.props.data)
    }

    for (let k in NimbleEmoji.defaultProps) {
      if (
        this.props[k] === undefined &&
        NimbleEmoji.defaultProps[k] != undefined
      ) {
        this.props[k] = NimbleEmoji.defaultProps[k]
      }
    }

    let data = this._getData(this.props)
    if (!data) {
      if (this.props.fallback) {
        return this.props.fallback(null, this.props)
      } else {
        return null
      }
    }

    let {unified, custom, short_names, image} = data,
      style = {},
      imageStyle = {},
      labelStyle = {},
      children = this.props.children,
      title = null,
      emojiImage,
      emojiImageSource

    if (!unified && !custom) {
      if (this.props.fallback) {
        return this.props.fallback(data, this.props)
      } else {
        return null
      }
    }

    if (this.props.tooltip) {
      title = short_names[0]
    }

    if (this.props.native && unified) {
      const fontSize = this.props.size
      labelStyle = {fontSize}
      children = unifiedToNative(unified)
      style.width = this.props.size + this.props.margin
      style.height = this.props.size + this.props.margin
    } else if (custom) {
      style = {
        width: this.props.size,
        height: this.props.size,
        margin: this.props.noMargin ? 0 : this.props.margin / 2,
      }

      if (data.spriteSheet) {
        const emojiPosition = this._getPosition(this.props)

        imageStyle = {
          position: 'absolute',
          top: emojiPosition.y,
          left: emojiPosition.x,
          width: `${100 * this.props.sheetColumns}%`,
          height: `${100 * this.props.sheetRows}%`,
        }

        emojiImage = <Image style={imageStyle} source={data.spriteSheet} />
      } else {
        imageStyle = {
          width: this.props.size,
          height: this.props.size,
        }

        emojiImage = (
          <Image style={imageStyle} source={this.props.emojiImageFn(image)} />
        )
      }
    } else {
      const setHasEmoji =
        data[`has_img_${this.props.set}`] == undefined ||
        data[`has_img_${this.props.set}`]

      if (!setHasEmoji) {
        if (this.props.fallback) {
          return this.props.fallback(data, this.props)
        } else {
          return null
        }
      }

      style = {
        width: this.props.size,
        height: this.props.size,
        margin: this.props.noMargin ? 0 : this.props.margin / 2,
      }

      const {useLocalImages} = this.props
      const emoji = this._getSanitizedData(this.props)

      if (useLocalImages && useLocalImages[emoji.id]) {
        imageStyle = {
          width: this.props.size,
          height: this.props.size,
        }

        emojiImageSource =
          useLocalImages[emoji.id].localImages[this.props.set][
            (emoji.skin || NimbleEmoji.defaultProps.skin) - 1
          ]
      } else {
        const emojiPosition = this._getPosition(this.props)

        imageStyle = {
          position: 'absolute',
          top: emojiPosition.y,
          left: emojiPosition.x,
          width: `${100 * this.props.sheetColumns}%`,
          height: `${100 * this.props.sheetRows}%`,
        }

        emojiImageSource = this.props.spriteSheetFn(
          this.props.set,
          this.props.sheetSize,
        )
      }

      emojiImage = <Image style={imageStyle} source={emojiImageSource} />
    }

    const emojiComponent = (
      <View style={[styles.emojiWrapper, style]}>
        {emojiImage || (
          <Text style={[styles.labelStyle, labelStyle]}>{children}</Text>
        )}
      </View>
    )

    return this.props.onPress || this.props.onLongPress ? (
      <TouchableWithoutFeedback
        onPress={this._handlePress}
        onLongPress={this._handleLongPress}
      >
        {emojiComponent}
      </TouchableWithoutFeedback>
    ) : (
      emojiComponent
    )
  }
}

export default NimbleEmoji
