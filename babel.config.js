module.exports = function (api) {
   api.cache(true);
   return {
      presets: [
         [
            // 'babel-preset-expo',
            'babel-preset-expo',
            {
               jsxRuntime: 'automatic',
            },
         ],
      ],
      // env: {
      //    production: {
      //       plugins: ['react-native-paper/babel'],
      //    },
      // },
   };
};
