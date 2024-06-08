module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      // To get smaller bundle size - rewrites the import statements so that only the modules you use are imported instead of the whole library.
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
  };
};
