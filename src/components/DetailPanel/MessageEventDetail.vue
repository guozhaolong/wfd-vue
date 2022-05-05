<template>
  <div :data-type="model.type" style="height: 100%">
    <div class="panel-title">{{ i18n['messageEvent'] }}</div>
    <el-scrollbar wrap-style="overflow-x: hidden !important;" class="panel-body">
      <DefaultDetail :model="model" :onChange="onChange" :readOnly="readOnly"/>
      <div class="panel-row">
        <div>{{ i18n['messageEvent.message'] }}：</div>
        <el-select style="width:90%; font-size: 12px"
                   :placeholder="i18n['messageEvent.message']"
                   :value="model.message"
                   :disabled="readOnly"
                   @change="(e) => { onChange('message', e) }">
          <el-option v-for="message in messageDefs" :key="message.id" :label="message.name" :value="message.id" />
        </el-select>
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
    },
    messageDefs: {
      type: Array,
      default: () => ([]),
    },
  },
}
</script>
