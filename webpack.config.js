const path = require("path");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const htmlPlugin = require("html-webpack-plugin");
const loadPresets = env => require("./build_utils/loadPresets")(env);
const loadConfigs = env => require(`./build_utils/webpack.${env.mode}`)(env);

const SRC_DIR = path.resolve("./src");

const config = (
   { mode, presets } = { mode: "development", presets: "polymer" }
) =>
   webpackMerge(
      {
         mode,
         entry: path.resolve("./src/index.js"),
         module: {
            rules: []
         },
         plugins: [
            new htmlPlugin({
               template: path.resolve("./index.html")
            })
         ],
         resolve: {
            alias: {
               handlebars: path.resolve(
                  "./node_modules/handlebars/dist/handlebars.min.js"
               )
            }
         }
      },
      loadPresets({ mode, presets }),
      loadConfigs({ mode, presets })
   );

module.exports = config;
