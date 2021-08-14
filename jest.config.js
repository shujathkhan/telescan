const transformIgnoreModules = [
  'react-native',
  'react-native-permissions',
  '@react-native',
  '@react-native-picker/picker',
  '@react-native-community',
  '@react-navigation',
];

module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [`node_modules/(?!(${transformIgnoreModules.join('|')})/)`],
  setupFiles: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/assetsTransformer.js',
    '\\.(css|less)$': '<rootDir>/assetsTransformer.js',
  },
};
