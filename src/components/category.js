import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  // PixelRatio
} from 'react-native'

import frequently from '../utils/frequently'
import {getData, getSanitizedData, chunk} from '../utils'

import NimbleEmoji from './emoji/nimble-emoji'
import NotFound from './not-found'

const styles = StyleSheet.create({
  emojisContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
})

export default class Category extends React.Component {
  static propTypes /* remove-proptypes */ = {
    emojis: PropTypes.array,
    hasStickyPosition: PropTypes.bool,
    name: PropTypes.string.isRequired,
    native: PropTypes.bool.isRequired,
    perLine: PropTypes.number.isRequired,
    emojiProps: PropTypes.object.isRequired,
    recent: PropTypes.arrayOf(PropTypes.string),
    notFound: PropTypes.func,
    notFoundEmoji: PropTypes.string.isRequired,
    theme: PropTypes.oneOf(['light', 'dark']),
  }

  static defaultProps = {
    emojis: [],
    hasStickyPosition: true,
    theme: 'light',
  }

  constructor(props) {
    super(props)

    this.data = props.data

    this.active = {}
    // Set first 2 pages to active
    if (props.name == 'Recent' || props.name == 'Smileys & People') {
      this.active['page-0'] = true
    }

    if (props.name == 'Search') {
      this.active['page-0'] = true
      this.active['page-1'] = true
    }

    this.state = {
      visible: true,
    }
  }

  componentDidMount() {
    this.minMargin = 0
    this.pagesOffsetLeft = {}
    this.maxMargin = {}
  }

  shouldComponentUpdate(nextProps, nextState) {
    var {
        name,
        perLine,
        native,
        hasStickyPosition,
        emojis,
        emojiProps,
      } = this.props,
      {skin, size, set} = emojiProps,
      {
        perLine: nextPerLine,
        native: nextNative,
        hasStickyPosition: nextHasStickyPosition,
        emojis: nextEmojis,
        emojiProps: nextEmojiProps,
      } = nextProps,
      {skin: nextSkin, size: nextSize, set: nextSet} = nextEmojiProps,
      shouldUpdate = false

    if (name == 'Recent' && perLine != nextPerLine) {
      shouldUpdate = true
    }

    if (name == 'Search') {
      shouldUpdate = !(emojis == nextEmojis)
    }

    if (
      skin != nextSkin ||
      size != nextSize ||
      native != nextNative ||
      set != nextSet ||
      hasStickyPosition != nextHasStickyPosition
    ) {
      shouldUpdate = true
    }

    return shouldUpdate
  }

  getMaxMarginValue() {
    let maxMargin = this.left

    for (let key in this.maxMargin) {
      if (this.maxMargin.hasOwnProperty(key)) maxMargin += this.maxMargin[key]
    }

    return maxMargin
  }

  calculateVisibility(scrollLeft) {
    if (
      this.pages &&
      typeof this.left === 'number' &&
      scrollLeft % this.width === 0
    ) {
      let {pagesToEagerLoad} = this.props
      for (let index in this.pages) {
        const page = parseInt(index) + 1
        const pageWidth = this.maxMargin[`page-${index}`] || 0
        const pageLeft =
          this.pagesOffsetLeft[`page-${index}`] || this.left + index * pageWidth

        const pageEagerLoadWidth = pageWidth * pagesToEagerLoad

        this.active[`page-${index}`] =
          scrollLeft >= pageLeft - pageEagerLoadWidth &&
          scrollLeft <= pageLeft + pageEagerLoadWidth
      }

      this.forceUpdate()
    }
  }

  handleScroll(scrollLeft) {
    const maxMargin = this.getMaxMarginValue()

    this.calculateVisibility(scrollLeft)
    const bleed = this.width / 2
    const thisLeftWithBleed = this.left - bleed

    if (scrollLeft >= thisLeftWithBleed && scrollLeft <= maxMargin) {
      return true
    }

    return
  }

  getEmojis() {
    var {name, emojis, recent, perLine, emojiProps} = this.props

    if (name == 'Recent') {
      let {custom} = this.props
      let frequentlyUsed = recent || frequently.get(perLine)

      if (frequentlyUsed.length) {
        emojis = frequentlyUsed
          .map((id) => {
            const emoji = custom.filter((e) => e.id === id)[0]
            if (emoji) {
              return emoji
            }

            return id
          })
          .filter((id) => !!getData(id, null, null, this.data))
      }

      if (emojis.length === 0 && frequentlyUsed.length > 0) {
        return null
      }
    }

    if (emojis) {
      emojis = emojis.slice(0)
    }

    return emojis
  }

  updateDisplay(visible) {
    var emojis = this.getEmojis()

    if (!emojis) {
      return
    }

    this.setState({visible})
  }

  setPagesRef(index, c) {
    if (!this.pages) {
      this.pages = {}
    }

    this.pages[index] = c
  }

  onLayout = (index, event) => {
    const {x: left, width} = event.nativeEvent.layout

    if (index === 0) {
      this.left = left
      this.width = width
    }

    this.pagesOffsetLeft[`page-${index}`] = left
    this.maxMargin[`page-${index}`] = width
  }

  _getSanitizedData = (props) => {
    const {emoji, skin, set} = props
    return getSanitizedData(emoji, skin, set, this.data)
  }

  render() {
    var {
        id,
        name,
        hasStickyPosition,
        emojiProps,
        i18n,
        perLine,
        rows,
        pagesToEagerLoad,
        notFound,
        notFoundEmoji,
        theme,
      } = this.props,
      emojis = this.getEmojis(),
      {visible} = this.state

    const {size: emojiSize, margin: emojiMargin} = emojiProps

    const emojiSizing = emojiSize + emojiMargin
    // Wanted to use PixelRatio.roundToNearestPixel() here to accomodate
    // multiple devices, however the values passed still gets modified..
    // TODO: If PixelRatio.roundToNearestPixel() starts working correctly,
    // change hard value back to using PixelRatio.roundToNearestPixel()
    // const emojisListWidth = PixelRatio.roundToNearestPixel(
    //   perLine * emojiSizing + emojiMargin + 2,
    // )
    // const emojisListHeight = PixelRatio.roundToNearestPixel(
    //   rows * emojiSizing + emojiMargin,
    // )
    const emojisListWidth = 320
    const emojisListHeight = rows * emojiSizing + emojiMargin

    const paginatedEmojis = chunk(emojis, perLine * rows)

    return !emojis || !visible
      ? null
      : [
          emojis.length ? (
            paginatedEmojis.map((emojis, i) => {
              const pageVisible = this.active[`page-${i}`]

              return (
                <View
                  ref={this.setPagesRef.bind(this, i)}
                  onLayout={this.onLayout.bind(this, i)}
                  key={`${name}_emojis_${i}`}
                  style={[
                    styles.emojisContainer,
                    {
                      width: emojisListWidth,
                      height: emojisListHeight,
                      padding: emojiMargin / 2,
                      // TODO: Remove once we can use PixelRatio.roundToNearestPixel()
                      paddingLeft: 6,
                      paddingRight: 6,
                    },
                  ]}
                >
                  {emojis.map((item, i) => {
                    const emoji = this._getSanitizedData({
                      emoji: item,
                      ...emojiProps,
                    })

                    return pageVisible ? (
                      <NimbleEmoji
                        key={`${name}_emoji_${emoji.id}`}
                        emoji={emoji}
                        data={this.data}
                        {...emojiProps}
                      />
                    ) : null
                  })}
                </View>
              )
            })
          ) : (
            <NotFound
              style={{
                width: emojisListWidth,
                height: emojisListHeight,
                padding: emojiMargin / 2,
              }}
              key="notFound"
              i18n={i18n}
              notFound={notFound}
              notFoundEmoji={notFoundEmoji}
              data={this.data}
              emojiProps={emojiProps}
              theme={theme}
            />
          ),
        ]
  }
}
