import {buildSearch} from './data'
import stringFromCodePoint from '../polyfills/stringFromCodePoint'
import {uncompress} from './data'
import NimbleEmojiIndex from './emoji-index/nimble-emoji-index'

const COLONS_REGEX = /^(?:\:([^\:]+)\:)(?:\:skin-tone-(\d)\:)?$/
const SKINS = ['1F3FA', '1F3FB', '1F3FC', '1F3FD', '1F3FE', '1F3FF']

function unifiedToNative(unified) {
  var unicodes = unified.split('-'),
    codePoints = unicodes.map((u) => `0x${u}`)

  return stringFromCodePoint.apply(null, codePoints)
}

function sanitize(emoji) {
  var {
      name,
      short_names,
      skin_tone,
      skin_variations,
      emoticons,
      unified,
      custom,
      customCategory,
      image,
    } = emoji,
    id = emoji.id || short_names[0],
    colons = `:${id}:`

  if (custom) {
    return {
      id,
      name,
      short_names,
      colons,
      emoticons,
      custom,
      customCategory,
      image,
    }
  }

  if (skin_tone) {
    colons += `:skin-tone-${skin_tone}:`
  }

  return {
    id,
    name,
    short_names,
    colons,
    emoticons,
    unified: unified.toLowerCase(),
    skin: skin_tone || (skin_variations ? 1 : null),
    native: unifiedToNative(unified),
  }
}

function getSanitizedData() {
  return sanitize(getData(...arguments))
}

function getData(emoji, skin, set, data) {
  var emojiData = {}

  if (typeof emoji == 'string') {
    let matches = emoji.match(COLONS_REGEX)

    if (matches) {
      emoji = matches[1]

      if (matches[2]) {
        skin = parseInt(matches[2], 10)
      }
    }

    if (data.aliases.hasOwnProperty(emoji)) {
      emoji = data.aliases[emoji]
    }

    if (data.emojis.hasOwnProperty(emoji)) {
      emojiData = data.emojis[emoji]
    } else {
      return null
    }
  } else if (emoji.id) {
    if (data.aliases.hasOwnProperty(emoji.id)) {
      emoji.id = data.aliases[emoji.id]
    }

    if (data.emojis.hasOwnProperty(emoji.id)) {
      emojiData = data.emojis[emoji.id]
      skin || (skin = emoji.skin)
    }
  }

  if (!Object.keys(emojiData).length) {
    emojiData = emoji
    emojiData.custom = true

    if (!emojiData.search) {
      emojiData.search = buildSearch(emoji)
    }
  }

  emojiData.emoticons || (emojiData.emoticons = [])
  emojiData.variations || (emojiData.variations = [])

  if (emojiData.skin_variations && skin > 1) {
    emojiData = JSON.parse(JSON.stringify(emojiData))

    var skinKey = SKINS[skin - 1],
      variationData = emojiData.skin_variations[skinKey]

    if (variationData) {
      if (!variationData.variations && emojiData.variations) {
        delete emojiData.variations
      }

      if (
        (set &&
          (variationData[`has_img_${set}`] == undefined ||
            variationData[`has_img_${set}`])) ||
        !set
      ) {
        emojiData.skin_tone = skin

        for (let k in variationData) {
          let v = variationData[k]
          emojiData[k] = v
        }
      }
    }
  }

  if (emojiData.variations && emojiData.variations.length) {
    emojiData = JSON.parse(JSON.stringify(emojiData))
    emojiData.unified = emojiData.variations.shift()
  }

  return emojiData
}

function getEmojiDataFromNative(nativeString, set, data) {
  if (data.compressed) {
    uncompress(data)
  }

  const skinTones = ['🏻', '🏼', '🏽', '🏾', '🏿']
  const skinCodes = ['1F3FB', '1F3FC', '1F3FD', '1F3FE', '1F3FF']

  let skin
  let skinCode
  let baseNativeString = nativeString

  skinTones.forEach((skinTone, skinToneIndex) => {
    if (nativeString.indexOf(skinTone) > 0) {
      skin = skinToneIndex + 2
      skinCode = skinCodes[skinToneIndex]
    }
  })

  let emojiData

  for (let id in data.emojis) {
    let emoji = data.emojis[id]

    let emojiUnified = emoji.unified

    if (emoji.variations && emoji.variations.length) {
      emojiUnified = emoji.variations.shift()
    }

    if (skin && emoji.skin_variations && emoji.skin_variations[skinCode]) {
      emojiUnified = emoji.skin_variations[skinCode].unified
    }

    if (unifiedToNative(emojiUnified) === baseNativeString) emojiData = emoji
  }

  if (!emojiData) {
    return null
  }

  emojiData.id = emojiData.short_names[0]

  return getSanitizedData(emojiData, skin, set, data)
}

function getEmojiDataFromCustom(emoji, custom, data) {
  if (data.compressed) {
    uncompress(data)
  }

  const customEmojis = custom.map((emoji) => {
    return {
      ...emoji,
      id: emoji.short_names[0],
      custom: true,
    }
  })

  const emojiIndex = new NimbleEmojiIndex(data)
  const [customEmoji] = emojiIndex.search(emoji, {
    maxResults: 1,
    custom: customEmojis,
  })

  return customEmoji
}

function uniq(arr) {
  return arr.reduce((acc, item) => {
    if (acc.indexOf(item) === -1) {
      acc.push(item)
    }
    return acc
  }, [])
}

function intersect(a, b) {
  const uniqA = uniq(a)
  const uniqB = uniq(b)

  return uniqA.filter((item) => uniqB.indexOf(item) >= 0)
}

function deepMerge(a, b) {
  var o = {}

  for (let key in a) {
    let originalValue = a[key],
      value = originalValue

    if (b.hasOwnProperty(key)) {
      value = b[key]
    }

    if (typeof value === 'object') {
      value = deepMerge(originalValue, value)
    }

    o[key] = value
  }

  return o
}

// https://github.com/lodash/lodash/blob/master/slice.js
function slice(array, start, end) {
  let length = array == null ? 0 : array.length
  if (!length) {
    return []
  }
  start = start == null ? 0 : start
  end = end === undefined ? length : end

  if (start < 0) {
    start = -start > length ? 0 : length + start
  }
  end = end > length ? length : end
  if (end < 0) {
    end += length
  }
  length = start > end ? 0 : (end - start) >>> 0
  start >>>= 0

  let index = -1
  const result = new Array(length)
  while (++index < length) {
    result[index] = array[index + start]
  }
  return result
}

// https://github.com/lodash/lodash/blob/master/chunk.js
function chunk(array, size) {
  size = Math.max(size, 0)
  const length = array == null ? 0 : array.length
  if (!length || size < 1) {
    return []
  }
  let index = 0
  let resIndex = 0
  const result = new Array(Math.ceil(length / size))

  while (index < length) {
    result[resIndex++] = slice(array, index, (index += size))
  }
  return result
}

export {
  getData,
  getEmojiDataFromNative,
  getEmojiDataFromCustom,
  getSanitizedData,
  uniq,
  intersect,
  deepMerge,
  unifiedToNative,
  slice,
  chunk,
}
