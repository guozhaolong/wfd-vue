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

### Run Example
```
npm run serve
```
