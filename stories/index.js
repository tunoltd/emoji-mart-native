import React from 'react'

import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {
  withKnobs,
  text,
  boolean,
  number,
  select,
  color,
} from '@storybook/addon-knobs'
import {Image} from 'react-native'

import {
  Picker,
  Emoji,
  emojiIndex,
  NimbleEmojiIndex,
  getEmojiDataFromNative,
} from '../dist'

const THEMES = ['auto', 'light', 'dark']
const SETS = ['apple', 'google', 'twitter', 'facebook']
const CUSTOM_EMOJIS = [
  {
    name: 'Octocat',
    short_names: ['octocat'],
    keywords: ['github'],
    image: {
      uri: 'https://github.githubassets.com/images/icons/emoji/octocat.png',
    },
  },
  {
    name: 'Squirrel',
    short_names: ['shipit', 'squirrel'],
    keywords: ['github'],
    image: {
      uri: 'https://github.githubassets.com/images/icons/emoji/shipit.png',
    },
  },
]

const CUSTOM_EMOJIS_WITH_CATEGORIES = CUSTOM_EMOJIS.map((emoji) => {
  return Object.assign({}, emoji, {
    customCategory: emoji.name === 'Squirrel' ? 'Mammals' : 'Mollusks',
  })
})

storiesOf('Picker', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Picker
      onClick={action('clicked')}
      onSelect={action('selected')}
      onSkinChange={action('skin changed')}
      native={boolean('Unicode', true)}
      theme={select('Theme', THEMES, THEMES[0])}
      set={select('Emoji pack', SETS, SETS[0])}
      emojiSize={number('Emoji size', 24)}
      perLine={number('Per line', 9)}
      title={text('Idle text', 'Your Title Here')}
      emoji={text('Idle emoji', 'department_store')}
      defaultSkin={number('Default skin tone', 1)}
      color={color('Highlight color', '#ae65c5')}
      showPreview={boolean('Show preview', true)}
      showSkinTones={boolean('Show skin tones', true)}
      enableFrequentEmojiSort={boolean('Enabled frequent sort', false)}
      custom={CUSTOM_EMOJIS}
    />
  ))

  .add('Custom “Not found” component', () => (
    <Picker
      notFound={() => (
        <Image
          style={{width: 48, height: 48}}
          source={{
            uri:
              'https://github.githubassets.com/images/icons/emoji/octocat.png',
          }}
        />
      )}
    />
  ))

  .add('Custom categories', () => (
    <Picker custom={CUSTOM_EMOJIS_WITH_CATEGORIES} />
  ))

storiesOf('Emoji', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Emoji
      native={boolean('Unicode', true)}
      set={select('Emoji pack', SETS, SETS[0])}
      emoji={text('Emoji', '+1')}
      size={number('Emoji size', 64)}
      skin={number('Skin tone', 1)}
      html={boolean('HTML', false)}
      fallback={(emoji) => {
        return `:${emoji.short_names[0]}:`
      }}
    />
  ))

storiesOf('Headless Search', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    let results = emojiIndex.search(text('Search', 'christmas'), {
      custom: CUSTOM_EMOJIS,
    })
    if (!results) {
      return null
    }

    return (
      <div>
        {results.map((emoji) => {
          return (
            <span key={emoji.id} style={{marginLeft: '1.4em'}}>
              <Emoji native={true} emoji={emoji} size={48} />
            </span>
          )
        })}
      </div>
    )
  })

  .add('With skin tone from store', () => {
    const nimbleEmojiIndex = new NimbleEmojiIndex(data)
    let results = nimbleEmojiIndex.search(text('Search', 'thumbs'), {
      custom: CUSTOM_EMOJIS,
    })
    if (!results) {
      return null
    }

    return (
      <div>
        {results.map((emoji) => {
          return (
            <span key={emoji.id} style={{marginLeft: '1.4em'}}>
              <Emoji
                native={true}
                emoji={emoji}
                skin={emoji.skin || 1}
                size={48}
              />
            </span>
          )
        })}
      </div>
    )
  })

storiesOf('Get emoji data from Native', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const emojiData = getEmojiDataFromNative(
      text('Unicode', '🏋🏿‍♂️'),
      select('Emoji pack', SETS, SETS[0]),
      data,
    )
    if (!emojiData) {
      return <div>Couldn`t find any emoji data from native...</div>
    }

    return (
      <div>
        <Emoji
          emoji={emojiData}
          set={select('Emoji pack', SETS, SETS[0])}
          skin={emojiData.skin || 1}
          size={48}
        />

        <pre>emojiData: {JSON.stringify(emojiData, null, 2)}</pre>
      </div>
    )
  })
