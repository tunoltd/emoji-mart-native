import React from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, View, Text, ViewPropTypes} from 'react-native'

import NimbleEmoji from './emoji/nimble-emoji'

const styles = StyleSheet.create({
  labelText: {
    fontWeight: 'bold',
  },
  labelTextLight: {
    color: '#414141',
  },
  labelTextDark: {
    color: '#bebebe',
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
  static propTypes /* remove-proptypes */ = {
    notFound: PropTypes.func.isRequired,
    notFoundEmoji: PropTypes.string.isRequired,
    emojiProps: PropTypes.object.isRequired,
    style: ViewPropTypes.style,
    theme: PropTypes.oneOf(['light', 'dark']),
    fontSize: PropTypes.number,
  }

  static defaultProps = {
    theme: 'light',
    fontSize: 15,
  }

  render() {
    const {
      data,
      emojiProps,
      i18n,
      notFound,
      notFoundEmoji,
      style,
      theme,
      fontSize,
    } = this.props

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
              <Text
                style={[
                  styles.labelText,
                  theme === 'light'
                    ? styles.labelTextLight
                    : styles.labelTextDark,
                  {fontSize},
                ]}
              >
                {i18n.notfound}
              </Text>
            </View>
          </View>
        )}
      </View>
    )

    return component
  }
}
