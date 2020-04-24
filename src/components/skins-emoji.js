import React from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native'

import NimbleEmoji from './emoji/nimble-emoji'

const styles = StyleSheet.create({
  skinSwatches: {
    paddingTop: 2,
    paddingBottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skinSwatch: {
    width: 0,
    height: 0,
    overflow: 'hidden',
  },
  skinSwatchShown: {
    width: 32,
    height: 28,
    paddingLeft: 2,
    paddingRight: 2,
  },
  skin: {
    width: 28,
    height: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default class SkinsEmoji extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      opened: false,
    }
  }

  handlePress(skin) {
    var {onChange} = this.props

    if (!this.state.opened) {
      this.setState({opened: true})
    } else {
      this.setState({opened: false})
      if (skin != this.props.skin) {
        onChange(skin)
      }
    }
  }

  render() {
    const {skin, emojiProps, data, skinEmoji} = this.props
    const {opened} = this.state

    const skinToneNodes = []

    for (let skinTone = 1; skinTone <= 6; skinTone++) {
      const selected = skinTone === skin

      skinToneNodes.push(
        <View
          key={`skin-tone-${skinTone}`}
          style={[
            styles.skinSwatch,
            selected || opened ? styles.skinSwatchShown : null,
          ]}
        >
          {selected || opened ? (
            <View style={styles.skin}>
              <NimbleEmoji
                emoji={skinEmoji}
                data={data}
                onPress={this.handlePress.bind(this, skinTone)}
                {...emojiProps}
                skin={skinTone}
              />
            </View>
          ) : null}
        </View>,
      )
    }

    return <View style={styles.skinSwatches}>{skinToneNodes}</View>
  }
}

SkinsEmoji.propTypes /* remove-proptypes */ = {
  onChange: PropTypes.func,
  skin: PropTypes.number.isRequired,
  emojiProps: PropTypes.object.isRequired,
  skinTone: PropTypes.number,
  skinEmoji: PropTypes.string.isRequired,
}

SkinsEmoji.defaultProps = {
  onChange: () => {},
  skinTone: null,
}
