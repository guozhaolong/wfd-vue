<template>
    <div :data-clazz="model.clazz">
        <div class="panelTitle">{{i18n['process']}}</div>
        <div class="panelBody">
            <DefaultDetail :model="model" :onChange="onChange" :readOnly="readOnly" />
            <div class="panelRow">
                <div>{{i18n['process.id']}}：</div>
                <el-input style="width:90%; font-size:12px"
                          :disabled="readOnly"
                          :value="model.id"
                          @input="(value) => {onChange('id', value)}" />
            </div>
            <div class="panelRow">
                <div>{{i18n['process.name']}}：</div>
                <el-input style="width:90%; font-size:12px"
                          :disabled="readOnly"
                          :value="model.name"
                          @input="(value) => {onChange('name', value)}" />
            </div>
            <div class="panelRow">
                <div>
                    {{i18n['process.dataObjs']}}：
                    <el-button :disabled="readOnly" size="mini" @click="()=>{}">{{i18n['tooltip.edit']}}</el-button>
                </div>

            </div>
            <div class="panelRow">
                <div>
                    {{i18n['process.signalDefs']}}：
                    <el-button :disabled="readOnly" size="mini" @click="()=>{}">{{i18n['tooltip.edit']}}</el-button>
                </div>

            </div>
            <div class="panelRow">
                <div>
                    {{i18n['process.messageDefs']}}：
                    <el-button :disabled="readOnly" size="mini" @click="()=>{}">{{i18n['tooltip.edit']}}</el-button>
                </div>

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
