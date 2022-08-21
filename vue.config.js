module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "http://so.fthou.se",
        changeOrigin: true,
      },
    },
  },
};
