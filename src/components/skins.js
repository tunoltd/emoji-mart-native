import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native'

const styles = StyleSheet.create({
  skinSwatches: {
    paddingTop: 2,
    paddingBottom: 2,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 14,
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
    width: 20,
    height: 16,
    paddingLeft: 2,
    paddingRight: 2,
  },
  skin: {
    width: 16,
    height: 16,
    borderRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skinSelected: {
    width: 6,
    height: 6,
    borderRadius: 12,
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
    var { onChange } = this.props

    if (!this.state.opened) {
      this.setState({ opened: true })
    } else {
      this.setState({ opened: false })
      if (skin != this.props.skin) {
        onChange(skin)
      }
    }
  }

  render() {
    const { skin } = this.props
    const { opened } = this.state

    const skinToneNodes = []

    for (let i = 0; i < 6; i++) {
      const skinTone = i + 1
      const selected = skinTone == skin

      skinToneNodes.push(
        <View
          key={`skin-tone-${skinTone}`}
          style={[
            styles.skinSwatch,
            selected || opened ? styles.skinSwatchShown : null,
          ]}
        >
          {selected || opened ? (
            <TouchableWithoutFeedback
              onPress={this.handlePress.bind(this, skinTone)}
              style={[styles.skin, styles[`skinTone${skinTone}`]]}
            >
              <View style={[styles.skin, styles[`skinTone${skinTone}`]]}>
                {selected && opened ? (
                  <View style={styles.skinSelected} />
                ) : null}
              </View>
            </TouchableWithoutFeedback>
          ) : null}
        </View>,
      )
    }

    return <View style={styles.skinSwatches}>{skinToneNodes}</View>
  }
}

Skins.propTypes = {
  onChange: PropTypes.func,
  skin: PropTypes.number.isRequired,
}

Skins.defaultProps = {
  onChange: () => {},
}
