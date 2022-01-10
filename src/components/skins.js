import React from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native'

const styles = StyleSheet.create({
  skinSwatches: {
    paddingTop: 2,
    paddingBottom: 2,
    borderWidth: 1,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skinSwatchesLight: {
    borderColor: '#d9d9d9',
  },
  skinSwatchesDark: {
    borderColor: '#3f3f3f',
  },
  skinSwatch: {
    paddingLeft: 2,
    paddingRight: 2,
  },
  skin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skinSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
  skinTone1: {
    backgroundColor: '#ffc93a',
  },
  skinTone2: {
    backgroundColor: '#fadcbc',
  },
  skinTone3: {
    backgroundColor: '#e0bb95',
  },
  skinTone4: {
    backgroundColor: '#bf8f68',
  },
  skinTone5: {
    backgroundColor: '#9b643d',
  },
  skinTone6: {
    backgroundColor: '#594539',
  },
})

export default class Skins extends React.PureComponent {
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
    const {skin, theme, iconSize} = this.props
    const {opened} = this.state

    const skinToneNodes = []

    const skinSize = Math.round(iconSize * 0.6666666666666666)
    const skinSelectedSize = skinSize / 2

    for (let skinTone = 1; skinTone <= 6; skinTone++) {
      const selected = skinTone === skin

      if (selected || opened) {
        skinToneNodes.push(
          <View key={`skin-tone-${skinTone}`} style={[styles.skinSwatch]}>
            <TouchableWithoutFeedback
              onPress={this.handlePress.bind(this, skinTone)}
              style={[styles.skin, styles[`skinTone${skinTone}`]]}
            >
              <View
                style={[
                  styles.skin,
                  {
                    width: skinSize,
                    height: skinSize,
                    borderRadius: skinSize / 2,
                  },
                  styles[`skinTone${skinTone}`],
                ]}
              >
                {selected && opened ? (
                  <View
                    style={[
                      styles.skinSelected,
                      {
                        width: skinSelectedSize,
                        height: skinSelectedSize,
                        borderRadius: skinSelectedSize / 2,
                      },
                    ]}
                  />
                ) : null}
              </View>
            </TouchableWithoutFeedback>
          </View>,
        )
      }
    }

    return (
      <View
        style={[
          styles.skinSwatches,
          theme === 'light'
            ? styles.skinSwatchesLight
            : styles.skinSwatchesDark,
        ]}
      >
        {skinToneNodes}
      </View>
    )
  }
}

Skins.propTypes /* remove-proptypes */ = {
  onChange: PropTypes.func,
  skin: PropTypes.number.isRequired,
  theme: PropTypes.oneOf(['light', 'dark']),
}

Skins.defaultProps = {
  onChange: () => {},
  theme: 'light',
}
