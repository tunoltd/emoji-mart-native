const {devDependencies} = require('./package.json')

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
    [
      'babel-plugin-transform-define',
      {
        'process.env.NODE_ENV': 'production',
        EMOJI_DATASOURCE_VERSION: devDependencies['emoji-datasource'],
      },
    ],
  ],
  env: {
    cjs: {
      presets: [
        [
          '@babel/preset-env',
          {
            modules: 'cjs',
          },
        ],
      ],
    },
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
            },
          },
        ],
      ],
    },
  },
}
