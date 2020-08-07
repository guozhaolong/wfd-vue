## Workflow Designer for Vue

[![NPM Version](http://img.shields.io/npm/v/wfd-vue.svg?style=flat)](https://www.npmjs.org/package/wfd-vue)
[![NPM Downloads](https://img.shields.io/npm/dm/wfd-vue.svg?style=flat)](https://www.npmjs.org/package/wfd-vue)
![](https://img.shields.io/badge/license-MIT-000000.svg)

![image](https://github.com/guozhaolong/wfd-vue/raw/master/example/snapshots/1.jpg)

## Online Demo
https://guozhaolong.github.io/wfd-vue/

## Usage
```
<template>
  <div id="app">
    <wfd-vue ref="wfd" :data="demoData" :height="600" :users="candidateUsers" :groups="candidateGroups" :categorys="categorys" :lang="lang" />
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
      candidateUsers: [...],
      candidateGroups: [...],
      categorys: [...]
    }
  }
}
</script>
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
* categorys: 选择分类时对应的数据，数组内对象以id为键，name为值

###### 方法
* save(): 调用this.$refs['wfd'].graph.save()生成json
* saveXML(): 调用this.$refs['wfd'].graph.saveXML(createFile)生成Flowable XML，createFile参数是否同时生成xml文件，默认为true
* saveImg(): 调用this.$refs['wfd'].graph.saveImg(createFile)生成图片，createFile参数表示是否生成图片文件，默认为true，该函数返回值为图片base64


### Run Example
```
npm run serve
```

## 友情链接（flowable流程设计器，感谢@GoldSubmarine提供）
https://github.com/GoldSubmarine/workflow-bpmn-modeler
