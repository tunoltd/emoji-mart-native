import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native'

import { NimbleEmoji } from '.'

const styles = StyleSheet.create({
  anchors: {
    borderTopWidth: 1,
    borderTopColor: '#f6f7f8',
    backgroundColor: '#e4e7e9',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  static propTypes = {
    categories: PropTypes.array,
    onAnchorPress: PropTypes.func,
    emojiProps: PropTypes.object.isRequired,
    categoryEmojis: PropTypes.object.isRequired,
  }

  static defaultProps = {
    categories: [],
    onAnchorPress: () => {},
  }

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
    this.setState({ selected: categoryName }, () => {
      const { selected } = this.state
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
      this.scrollView.scrollTo({ x: contentOffset, animated: true })
    })
  }

  handlePress(index) {
    var { categories, onAnchorPress } = this.props

    onAnchorPress(categories[index], index)
  }

  setScrollViewRef(c) {
    this.scrollView = c
  }

  onAnchorsScrollViewLayout = (event) => {
    this.clientWidth = event.nativeEvent.layout.width
  }

  onAnchorLayout = (index, event) => {
    var { categories } = this.props
    const { x: left, width } = event.nativeEvent.layout

    const category = categories[index]

    this.anchorsOffset[category.name] = left
    this.anchorsWidth[category.name] = width
  }

  render() {
    var {
        categories,
        onAnchorPress,
        color,
        i18n,
        emojiProps,
        categoryEmojis,
      } = this.props,
      { selected } = this.state

    return (
      <ScrollView
        ref={this.setScrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        onLayout={this.onAnchorsScrollViewLayout}
      >
        <View style={styles.anchors}>
          {categories.map((category, i) => {
            var { id, name, anchor } = category,
              isSelected = name == selected

            if (anchor === false) {
              return null
            }

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
                    data={this.data}
                    {...emojiProps}
                    emoji={categoryEmojis[id]}
                    onPress={null}
                    onLongPress={null}
                  />
                  <View
                    style={[
                      styles.anchorBar,
                      isSelected ? styles.anchorBarSelected : null,
                      { backgroundColor: color },
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
