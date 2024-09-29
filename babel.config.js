// module.exports = function (api) {
//     api.cache(true);
//     return {
//       presets: ['babel-preset-expo', '@babel/preset-typescript'],
//       plugins: [
//         [
//           'module-resolver',
//           {
//             alias: {
//               '@': './src',
//             },
//           },
//         ],
//       ],
//     };
//   };
module.exports = function(api) {
    api.cache(true);
    return {
      presets: [
        'module:metro-react-native-babel-preset',  // Preset cho React Native
        '@babel/preset-typescript',  // Nếu bạn sử dụng TypeScript
      ],
      plugins: [
        ['@babel/plugin-transform-class-properties', { loose: true }],  // Đồng nhất loose mode
        ['@babel/plugin-transform-private-methods', { loose: true }],   // Đồng nhất loose mode
        ['@babel/plugin-transform-private-property-in-object', { loose: true }],  // Đồng nhất loose mode
        'react-native-reanimated/plugin',  // Nếu bạn sử dụng react-native-reanimated
        [
          'module-resolver',
          {
            alias: {
              '@': './src',  // Alias cho các đường dẫn
            },
          },
        ],
      ],
    };
  };
  