## Workflow Designer for Vue

[![NPM Version](http://img.shields.io/npm/v/wfd-vue.svg?style=flat)](https://www.npmjs.org/package/wfd-vue)
[![NPM Downloads](https://img.shields.io/npm/dm/wfd-vue.svg?style=flat)](https://www.npmjs.org/package/wfd-vue)
![](https://img.shields.io/badge/license-MIT-000000.svg)

npm包的umd.min文件900k，我再琢磨一下...
## Online Demo
https://guozhaolong.github.io/wfd-vue/index.html

## Usage
```
<template>
  <div id="app">
    <wfd-vue ref="wfd" :data="demoData" :height="600" :users="candidateUsers" :groups="candidateGroups" :lang="lang" />
  </div>
</template>

<script>
import WfdVue from 'wfd-vue'
export default {
  name: 'app',
  components:{
    WfdVue
  },
  data () {
    return {
      lang: "zh",
      demoData: {...},
      demoData1: {...},
      candidateUsers: [...],
      candidateGroups: [...]
    }
  }
}
```

## API
###### 属性
* data: 初始化数据
* height: 画布高度
* mode: view为只读，edit为可编辑
* lang: zh为中文，en为英文
* isView: 是否为预览模式（隐藏工具栏和属性栏）
* users: 选择审批人时对应的数据，数组内对象以id为键，name为值
* groups: 选择审批组时对应的数据，数组内对象以id为键，name为值

###### 方法
* save(): 调用this.$refs['wfd'].graph.saveXML()生成json
* saveXML(): 调用graph.saveXML(createFile)生成Flowable XML，createFile参数是否同时生成xml文件，默认为true


### Run Example
```
npm run serve
```
