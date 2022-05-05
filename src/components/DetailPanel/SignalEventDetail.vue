<template>
  <div :data-type="model.type" style="height: 100%">
    <div class="panel-title">{{ i18n['signalEvent'] }}</div>
    <el-scrollbar wrap-style="overflow-x: hidden !important;" class="panel-body">
      <DefaultDetail :model="model" :onChange="onChange" :readOnly="readOnly"/>
      <div class="panel-row">
        <div>{{ i18n['signalEvent.signal'] }}：</div>
        <el-select style="width:90%; font-size: 12px"
                   :placeholder="i18n['signalEvent.signal']"
                   :value="model.signal"
                   :disabled="readOnly"
                   @change="(e) => { onChange('signal', e) }">
          <el-option v-for="signal in signalDefs" :key="signal.id" :label="signal.name" :value="signal.id"/>
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
    signalDefs: {
      type: Array,
      default: () => ([]),
    },
  },
}
</script>
