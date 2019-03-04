var path = require("path");
const config = env => ({
   output: {
      // path: DIST_DIR,
      filename: "bundle.js"
   },
   module: {
      rules: [
         {
            test: /\.(css|scss)$/,
            use: ["style-loader", "css-loader", "sass-loader"]
         },
         {
            test: /\.hbs$/,
            loader: "raw-loader"
         }
      ]
   },
   plugins: []
});

module.exports = config;
