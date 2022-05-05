<template>
  <div :data-type="model.type" style="height: 100%">
    <div class="panel-title">{{
        model.type === 'exclusive-gateway' || model.type === 'gateway' ? i18n['exclusiveGateway']
            : model.type === 'parallel-gateway' ? i18n['parallelGateway'] : i18n['inclusiveGateway']
      }}
    </div>
    <el-scrollbar wrap-style="overflow-x: hidden !important;" class="panel-body">
      <DefaultDetail :model="model" :onChange="onChange" :readOnly="readOnly"/>
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
