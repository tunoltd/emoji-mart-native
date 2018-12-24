import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'

import NimbleEmoji from './emoji/nimble-emoji'

const emojiIcon = require('../assets/emoji-icon.png')

const styles = StyleSheet.create({
  labelText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  notFound: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default class NotFound extends React.PureComponent {
  static propTypes = {
    notFound: PropTypes.func.isRequired,
    notFoundEmoji: PropTypes.string.isRequired,
    emojiProps: PropTypes.object.isRequired,
    style: View.propTypes.style,
  }

  render() {
    const { data, emojiProps, i18n, notFound, notFoundEmoji, style } = this.props

    const component = (
      <View style={[style ? style : null, styles.notFound]}>
        {(notFound && notFound()) || (
          <View style={styles.notFound}>
            <View>
              <NimbleEmoji
                data={data}
                {...emojiProps}
                emoji={notFoundEmoji}
                onPress={null}
                onLongPress={null}
              />
            </View>

            <View>
              <Text style={styles.labelText}>{i18n.notfound}</Text>
            </View>
          </View>
        )}
      </View>
    )

    return component
  }
}
