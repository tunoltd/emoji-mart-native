import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native'

import NimbleEmoji from './emoji/nimble-emoji'

const styles = StyleSheet.create({
  anchors: {
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  anchorsLight: {
    borderTopColor: '#f6f7f8',
    backgroundColor: '#e4e7e9',
  },
  anchorsDark: {
    borderTopColor: '#090807',
    backgroundColor: '#1b1816',
  },
  anchor: {
    flex: 1,
    paddingTop: 12.5,
    paddingBottom: 12.5,
    paddingLeft: 18,
    paddingRight: 18,
    overflow: 'hidden',
  },
  anchorBar: {
    position: 'absolute',
    bottom: -2,
    left: 0,
    right: 0,
    height: 2,
  },
  anchorBarSelected: {
    bottom: 0,
  },
})

export default class Anchors extends React.PureComponent {
  constructor(props) {
    super(props)

    let defaultCategory = props.categories.filter(
      (category) => category.first,
    )[0]

    this.data = props.data
    this.state = {
      selected: defaultCategory.name,
    }
    this.setScrollViewRef = this.setScrollViewRef.bind(this)
  }

  componentDidMount() {
    this.anchorsOffset = {}
    this.anchorsWidth = {}
  }

  onSelectAnchor(categoryName) {
    this.setState({selected: categoryName}, () => {
      const {selected} = this.state
      let contentOffset = 0

      if (this.clientWidth) {
        const anchorOffset = this.anchorsOffset[selected]
        const anchorWidth = this.anchorsWidth[selected]
        const anchorHalfWidth = anchorWidth / 2

        const clientCenter = this.clientWidth / 2
        const scrollStart = clientCenter - anchorHalfWidth

        if (anchorOffset > scrollStart) {
          contentOffset = anchorOffset - scrollStart
        }
      }
      this.scrollView.scrollTo({x: contentOffset, animated: true})
    })
  }

  handlePress(index) {
    var {categories, onAnchorPress} = this.props

    onAnchorPress(categories[index], index)
  }

  setScrollViewRef(c) {
    this.scrollView = c
  }

  onAnchorsScrollViewLayout = (event) => {
    this.clientWidth = event.nativeEvent.layout.width
  }

  onAnchorLayout = (index, event) => {
    var {categories} = this.props
    const {x: left, width} = event.nativeEvent.layout

    const category = categories[index]

    this.anchorsOffset[category.name] = left
    this.anchorsWidth[category.name] = width
  }

  render() {
    var {
        categories,
        color,
        i18n,
        emojiProps,
        categoryEmojis,
        theme,
      } = this.props,
      {selected} = this.state

    return (
      <ScrollView
        ref={this.setScrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        onLayout={this.onAnchorsScrollViewLayout}
      >
        <View
          style={[
            styles.anchors,
            theme === 'light' ? styles.anchorsLight : styles.anchorsDark,
          ]}
        >
          {categories.map((category, i) => {
            var {id, name, anchor} = category,
              isSelected = name == selected

            if (anchor === false) {
              return null
            }

            const categoryEmojiId = id.startsWith('custom-') ? 'custom' : id

            return (
              <TouchableWithoutFeedback
                key={id}
                data-index={i}
                onPress={this.handlePress.bind(this, i)}
                onLayout={this.onAnchorLayout.bind(this, i)}
              >
                <View
                  style={[
                    styles.anchor,
                    isSelected ? styles.anchorSelected : null,
                  ]}
                >
                  <NimbleEmoji
                    emoji={categoryEmojis[categoryEmojiId]}
                    data={this.data}
                    {...emojiProps}
                    onPress={this.handlePress.bind(this, i)}
                  />
                  <View
                    style={[
                      styles.anchorBar,
                      isSelected ? styles.anchorBarSelected : null,
                      {backgroundColor: color},
                    ]}
                  />
                </View>
              </TouchableWithoutFeedback>
            )
          })}
        </View>
      </ScrollView>
    )
  }
}

Anchors.propTypes /* remove-proptypes */ = {
  categories: PropTypes.array,
  onAnchorPress: PropTypes.func,
  emojiProps: PropTypes.object.isRequired,
  categoryEmojis: PropTypes.object.isRequired,
  theme: PropTypes.oneOf(['light', 'dark']),
}

Anchors.defaultProps = {
  categories: [],
  onAnchorPress: () => {},
  theme: 'light',
}
