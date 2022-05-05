<template>
  <div :data-type="model.type" style="height: 100%">
    <div class="panel-title">{{ i18n['timerEvent'] }}</div>
    <el-scrollbar wrap-style="overflow-x: hidden !important;" class="panel-body">
      <DefaultDetail :model="model" :onChange="onChange" :readOnly="readOnly"/>
      <div class="panel-row">
        <div>{{ i18n['timerEvent.cycle'] }}：</div>
        <el-input style="width:90%; font-size:12px"
                  type="textarea"
                  :rows="4"
                  :disabled="readOnly"
                  :value="model.cycle"
                  @input="(value) => {onChange('cycle', value)}"/>
      </div>
      <div class="panel-row">
        <div>{{ i18n['timerEvent.duration'] }}：</div>
        <el-input style="width:90%; font-size:12px"
                  type="textarea"
                  :rows="4"
                  :disabled="readOnly"
                  :value="model.duration"
                  @input="(value) => {onChange('duration', value)}"/>
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
