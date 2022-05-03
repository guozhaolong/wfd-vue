<template>
  <div :data-type="model.type">
    <div class="panelTitle">{{i18n['callActivity']}}</div>
    <div class="panelBody">
      <DefaultDetail :model="model" :onChange="onChange" :readOnly="readOnly" />
      <div class="panelRow">
        <div>{{i18n['callActivity.calledElement']}}：</div>
        <el-input style="width:90%; font-size:12px"
                  :disabled="readOnly"
                  :value="model.calledElement"
                  @input="(value) => {onChange('calledElement', value)}" />
      </div>
    </div>
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
