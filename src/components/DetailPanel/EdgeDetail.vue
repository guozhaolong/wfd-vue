<template>
  <div :data-type="model.type" style="height: 100%">
    <div class="panel-title">{{ i18n['Edge'] }}</div>
    <el-scrollbar wrap-style="overflow-x: hidden !important;" class="panel-body">
      <DefaultDetail :model="model" :onChange="onChange" :readOnly="readOnly"/>
      <div class="panel-row">
        <div>{{ i18n['Edge.expression'] }}：</div>
        <el-input style="width:90%; font-size:12px"
                  type="textarea"
                  :rows="4"
                  :disabled="readOnly"
                  :value="model.conditionExpression"
                  @input="(value) => {onChange('conditionExpression', value)}"/>
      </div>
      <div class="panel-row">
        <div>{{ i18n['Edge.seq'] }}：</div>
        <el-input style="width:90%; font-size:12px"
                  :disabled="readOnly"
                  :value="model.seq"
                  @input="(value) => {onChange('seq', value)}"/>
      </div>
      <div class="panel-row">
        <el-checkbox @change="(value) => onChange('reverse', value)"
                     :disabled="readOnly"
                     :value="!!model.reverse">{{ i18n['Edge.reverse'] }}
        </el-checkbox>
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
