const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const BASE_JS = "./src/client/js/";
module.exports={
    entry: {
      main:BASE_JS+"main.js",
      videoPlayer:BASE_JS+"videoPlayer.js",
      commentSection: BASE_JS+"commentSection.js",
      quotes: BASE_JS+"quotes.js",
      weather: BASE_JS+"weather.js"
    },
     plugins: [
      new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
    [
      '@babel/plugin-transform-runtime',
        {
          helpers: false,
          regenerator: true
        }
    ]
  ], 
    output:{
        filename: "js/[name].js",
        path: path.resolve(__dirname, "assets"),
        clean: true,
  },
 module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
       {
        test: /\.scss$/,
        use:[MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }  
    ],
  },
};