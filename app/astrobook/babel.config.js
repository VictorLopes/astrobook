module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        "extensions": [
          ".js",
          ".ios.js",
          ".android.js",
          ".png",
          ".jpg",
        ],
        "root": [
          "./src"
        ],
        "alias": {
          "@assets": "./src/assets",
          "@helpers": "./src/helpers",
          "@components": "./src/components",
          "@constants": "./src/constants",
          "@icons": "./src/assets/icons",
          "@helpers": "./src/helpers",
          "@scenes": "./src/scenes",
          "@services": "./src/services"
        }
      }
    ]
  ]
}
