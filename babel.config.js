module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: 'react-native-dotenv',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
    ['react-native-worklets-core/plugin'],
    [
      'react-native-reanimated/plugin',
      {
        globals: ['__detectObjects'],
      },
    ],
    ['react-native-paper/babel'],
  ],
};
