# Workflow Designer for Vue

![](https://img.shields.io/badge/license-MIT-000000.svg)

![image](https://github.com/zengqiu/wfd-vue/raw/master/example/snapshots/1.jpg)

## Demo

https://zengqiu.github.io/wfd-vue/

## Usage

```
<template>
  <div id="app">
    <wfd-vue ref="wfd" :data="demoData" :process-data="processData" :height="600" :users="candidateUsers" :groups="candidateGroups" :lang="lang" :forms="forms" />
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
      processData: {...},
      candidateUsers: [...],
      candidateGroups: [...],
      forms: [
        {
          "id": 1,
          "name": "表单一",
            "fields": [
            {
              "id": "hello",
              "name": "你好"
            }, {
              "id": "rate",
              "name": "评分"
            }, {
              "id": "created",
              "name": "创建时间"
            }
          ]
        }, {
          "id": 2,
          "name": "表单一",
          "fields": [
            {
              "id": "radio",
              "name": "单选框组"
            }
          ]
        }
      ]
    }
  }
}
</script>
```

## API

### 属性

* data: 初始化数据
* process-data: 初始化流程数据
* height: 画布高度
* mode: view为只读，edit为可编辑
* lang: zh为中文，en为英文
* isView: 是否为预览模式（隐藏工具栏和属性栏）
* users: 选择审批人时对应的数据，数组内对象以id为键，name为值
* groups: 选择审批组时对应的数据，数组内对象以id为键，name为值

### 方法

* save(): 调用 `this.$refs['wfd'].graph.save()` 生成 JSON。
* saveImg(): 调用 `this.$refs['wfd'].graph.saveImg(createFile)` 生成图片，`createFile` 参数表示是否生成图片文件，默认为 `true`，该函数返回值为图片 Base64。

## Run Example

```
npm run serve
```

## 待办事项

- [ ] 验证
  - [ ] 将验证放置到设置面板中
  - [ ] 验证提示多语言设置
  - [ ] 孤立节点验证
- [ ] 重构
  - [ ] 清理调试代码
  - [ ] 格式化代码
  - [ ] 优化代码
