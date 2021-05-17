# picture-resize

批量处理图片大小和圆角，将`images`目录下的图片转换到目录`dist/${size}`下

## 安装

基于 [sharp](https://github.com/lovell/sharp/tree/master) 库需要安装gyp，python, vs-builder-tools环境，根据报错提示安装相应环境

## 用法

1. 准备好一些图片，放到images下，修改cut.js脚本。
2. `node cut.js`
3. 默认更改size和radius即可开箱即用
