const { defineConfig } = require('@vue/cli-service')
const fs = require("fs");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: "localhost",
    port: 8001,
    https: {
      key: fs.readFileSync("ssl/localhost+2-key.pem"),
      cert: fs.readFileSync("ssl/localhost+2.pem")
    }
  }
})
