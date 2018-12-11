import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

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
    width: '100%',
    height: '100%',
  },
})

export default class NotFound extends React.PureComponent {
  static propTypes = {
    notFound: PropTypes.func.isRequired,
    notFoundString: PropTypes.string.isRequired,
    emojiProps: PropTypes.object.isRequired,
  }

  render() {
    const { data, emojiProps, i18n, notFound, notFoundEmoji } = this.props

    return notFound ? notFound() : (
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
    )
  }
}
