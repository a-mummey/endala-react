const webpack = require("webpack");
module.exports = function override(config, env) {
  config.resolve.fallback = {
    buffer: false,
    crypto: false,
    events: false,
    path: false,
    stream: require.resolve("stream-browserify"),
    string_decoder: false,
  };
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    })
  );

  return config;
};
