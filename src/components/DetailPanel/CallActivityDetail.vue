<template>
  <div :data-type="model.type" style="height: 100%">
    <div class="panel-title">{{i18n['callActivity']}}</div>
    <el-scrollbar wrap-style="overflow-x: hidden !important;" class="panel-body">
      <DefaultDetail :model="model" :onChange="onChange" :readOnly="readOnly" />
      <div class="panel-row">
        <div>{{i18n['callActivity.calledElement']}}：</div>
        <el-input style="width:90%; font-size:12px"
                  :disabled="readOnly"
                  :value="model.calledElement"
                  @input="(value) => {onChange('calledElement', value)}" />
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
      type:Object,
      default: ()=>({}),
    },
    onChange: {
      type: Function,
      default: ()=>{}
    },
    readOnly:{
      type: Boolean,
      default: false,
    }
  },
}
</script>
