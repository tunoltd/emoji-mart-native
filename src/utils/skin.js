import store from './store'

let skin, initialized

function init() {
  initialized = true
  skin = store.get('skin')
}

function set(skinTone) {
  if (!initialized) init()

  skin = skinTone
  store.set('skin', skinTone)
}

function get() {
  if (!initialized) init()

  return skin
}

export default {set, get}
