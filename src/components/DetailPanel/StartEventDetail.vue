<template>
    <div :data-type="model.type">
        <div class="panelTitle">{{i18n['startEvent']}}</div>
        <div class="panelBody">
            <DefaultDetail :model="model" :onChange="onChange" :readOnly="readOnly" />
            <div class="panelRow">
              <div>{{i18n['readonlyFormFields']}}：</div>
              <el-select style="width:90%; font-size:12px"
                         :disabled="readOnly"
                         :value="model.readonlyFormFields"
                         :multiple="true"
                         :filterable="true"
                         @change="(e) => onChange('readonlyFormFields', e)">
                <el-option v-for="field in formFieldsCopy" :key="field.id" :label="field.name" :value="field.id" />
              </el-select>
            </div>
            <div class="panelRow">
              <div>{{i18n['hiddenFormFields']}}：</div>
              <el-select style="width:90%; font-size:12px"
                         :disabled="readOnly"
                         :value="model.hiddenFormFields"
                         :multiple="true"
                         :filterable="true"
                         @change="(e) => onChange('hiddenFormFields', e)">
                <el-option v-for="field in formFieldsCopy" :key="field.id" :label="field.name" :value="field.id" />
              </el-select>
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
      formFields: {
        type: Array,
        default: ()=>([]),
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
    data() {
      return {
        formFieldsCopy: this.formFields,
      }
    }
  }
</script>
