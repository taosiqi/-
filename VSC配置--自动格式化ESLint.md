# VSC配置--自动格式化ESLint

vscode配置eslint代码格式化
 前提：vscode安装eslint和prettier两个插件

打开vscode后点击右上角`文件->首选项->设置`进入用户配置面板

用户配置，具体配置如下：

```
{
  "editor.tabSize":2,  #代码缩进修改成2个空格
  "editor.formatOnSave": true,  #每次保存的时候自动格式化
  "eslint.autoFixOnSave": false,  #每次保存的时候将代码按eslint格式进行修复
  "prettier.eslintIntegration": true,  #让prettier使用eslint的代码格式进行校验
  "prettier.semi": false,  #去掉代码结尾的分号
  "prettier.singleQuote": true,  #使用带引号替代双引号
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true  #让函数(名)和后面的括号之间加个空格
}
```

CTRL+S保存时会将代码自动转成符合eslint风格的代码了

当然，如果你使用VUE,还可以进行以下配置

```
{
  "vetur.format.defaultFormatter.html": "js-beautify-html",  #这个按用户自身习惯选择
  "vetur.format.defaultFormatter.js": "vscode-typescript",  #让vue中的js按编辑器自带的ts格式进行格式化
  "vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
      "wrap_attributes": "force-aligned"  #vue组件中html代码格式化样式
    }
  }
}
```

