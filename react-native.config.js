module.exports = {
  assets: ['./src/assets/fonts/'],
  getTransformModulePath() {
    return require('react-native-typescript-transformer');
  },
  getSourceExts() {
    return ['ts', 'tsx'];
  },
};
