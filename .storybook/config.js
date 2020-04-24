import {configure} from '@storybook/react'
import {setOptions} from '@storybook/addon-options'

setOptions({
  name: 'Contribute on GitHub',
  url: 'https://github.com/tunoltd/emoji-mart-native',
  downPanelInRight: true,
  sidebarAnimations: false,
})

configure(() => require('../stories'), module)
