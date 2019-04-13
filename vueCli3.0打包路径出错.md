# vueCli3.0打包路径出错。

解决办法：vueCli3.0打包,新版本更新脚手架做出精简，webpack配置文件需要手动配置。在文件根目录创建一个vue.config.js配置文件。基本版：

按 Ctrl+C 复制代码

```
module.exports = {
    baseUrl: '/',
    outputDir: 'dist',
    lintOnSave: true,
    runtimeCompiler: true, //关键点在这  
    // 调整内部的 webpack 配置。
    // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/webpack.md
    chainWebpack: () => {},
    configureWebpack: () => {},
    // 配置 webpack-dev-server 行为。
    devServer: {
      open: process.platform === 'darwin',
      host: '0.0.0.0',
      port: 8080,
      https: false,
      hotOnly: false,
      // 查阅 https://github.com/vuejs/vue-doc-zh-cn/vue-cli/cli-service.md#配置代理
      proxy: null, // string | Object
      before: app => {}
    }
  }
```


按 Ctrl+C 复制代码
路径报错:

```
baseUrl: '/'
```

/*在前面加.*/

```
baseUrl: './'
```


