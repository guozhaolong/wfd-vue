<template>
  <div :data-type="model.type" style="height: 100%">
    <div class="panel-title">{{ i18n['sendTask'] }}</div>
    <el-scrollbar wrap-style="overflow-x: hidden !important;" class="panel-body">
      <DefaultDetail :model="model" :onChange="onChange" :readOnly="readOnly"/>
      <div class="panel-row">
        <div>{{ i18n['sendTask.to'] }}：</div>
        <el-input style="width:90%; font-size:12px"
                  :disabled="readOnly"
                  :value="model.to"
                  @input="(value) => {onChange('to', value)}"/>
      </div>
      <div class="panel-row">
        <div>{{ i18n['sendTask.subject'] }}：</div>
        <el-input style="width:90%; font-size:12px"
                  :disabled="readOnly"
                  :value="model.subject"
                  @input="(value) => {onChange('subject', value)}"/>
      </div>
      <div class="panel-row">
        <div>{{ i18n['sendTask.content'] }}：</div>
        <el-input style="width:90%; font-size:12px"
                  type="textarea"
                  :rows="4"
                  :disabled="readOnly"
                  :value="model.content"
                  @input="(value) => {onChange('content', value)}"/>
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
