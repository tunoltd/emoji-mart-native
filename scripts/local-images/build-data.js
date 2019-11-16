const build = require('./build')
const sets = ['apple', 'facebook', 'google', 'messenger', 'twitter']

build({ output: 'data/local-images/all.js' })

sets.forEach((set) => {
  build({
    output: `data/local-images/${set}.js`,
    sets: [set],
  })
})
