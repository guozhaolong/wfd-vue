<template>
    <div :data-type="model.type">
        <div class="panelTitle">{{i18n['sendTask']}}</div>
        <div class="panelBody">
            <DefaultDetail :model="model" :onChange="onChange" :readOnly="readOnly" />
            <div class="panelRow">
                <div>{{i18n['sendTask.to']}}：</div>
                <el-input style="width:90%; font-size:12px"
                          :disabled="readOnly"
                          :value="model.to"
                          @input="(value) => {onChange('to', value)}" />
            </div>
            <div class="panelRow">
                <div>{{i18n['sendTask.subject']}}：</div>
                <el-input style="width:90%; font-size:12px"
                          :disabled="readOnly"
                          :value="model.subject"
                          @input="(value) => {onChange('subject', value)}" />
            </div>
            <div class="panelRow">
                <div>{{i18n['sendTask.content']}}：</div>
                <el-input style="width:90%; font-size:12px"
                          type="textarea"
                          :rows="4"
                          :disabled="readOnly"
                          :value="model.content"
                          @input="(value) => {onChange('content', value)}" />
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
