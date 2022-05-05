<template>
  <div :data-type="model.type" style="height: 100%">
    <div class="panel-title">{{ i18n['serviceTask'] }}</div>
    <el-scrollbar wrap-style="overflow-x: hidden !important;" class="panel-body">
      <DefaultDetail :model="model" :onChange="onChange" :readOnly="readOnly"/>
      <div class="panel-row">
        <div>{{ i18n['serviceTask.class'] }}：</div>
        <el-input style="width:90%; font-size:12px"
                  :disabled="readOnly"
                  :value="model.class"
                  @input="(value) => {onChange('class', value)}"/>
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import DefaultDetail from "./DefaultDetail";

export default {
  inject: ['i18n'],
  components: {
    DefaultDetail
  },
  props: {
    model: {
      type: Object,
      default: () => ({}),
    },
    onChange: {
      type: Function,
      default: () => {
      }
    },
    readOnly: {
      type: Boolean,
      default: false,
    }
  },
}
</script>
