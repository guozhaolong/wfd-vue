<template>
    <div :data-clazz="model.clazz">
        <div class="panelTitle">{{i18n['userTask']}}</div>
        <div class="panelBody">
            <DefaultDetail :model="model" :onChange="onChange" :readOnly="readOnly" />
            <div class="panelRow">
                <div>{{i18n['userTask.assignType']}}：</div>
                <el-select style="width:90%; font-size: 12px"
                           :placeholder="i18n['userTask.assignType.placeholder']"
                           :value="model.assignType"
                           :disabled="readOnly"
                           @change="(e) => { onChange('assignValue', []);onChange('assignType', e) }">
                    <el-option key="person" value="person" :label="i18n['userTask.assignType.person']"/>
                    <el-option key="persongroup" value="persongroup" :label="i18n['userTask.assignType.persongroup']"/>
                    <el-option key="custom" value="custom" :label="i18n['userTask.assignType.custom']"/>
                </el-select>
            </div>
            <div v-if="model.assignType === 'person'" class="panelRow">
                <div>{{i18n['userTask.assignType.person.title']}}：</div>
                <el-select style="width:90%; font-size:12px"
                           :placeholder="i18n['userTask.assignType.person.placeholder']"
                           :disabled="readOnly"
                           :value="model.assignValue"
                           :multiple="true"
                           :filterable="true"
                           :filter-method="(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0"
                           @change="(e) => onChange('assignValue', e)">
                    <el-option v-for="user in users" :key="user.id" :label="user.name" :value="user.id" />
                </el-select>
            </div>
            <div v-else-if="model.assignType === 'persongroup'" class="panelRow">
                <div>{{i18n['userTask.assignType.persongroup.title']}}：</div>
                <el-select style="width:90%; font-size:12px"
                           :placeholder="i18n['userTask.assignType.persongroup.placeholder']"
                           :value="model.assignValue"
                           :disabled="readOnly"
                           :multiple="true"
                           :filterable="true"
                           :filter-method="(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0"
                           @change="(e) => onChange('assignValue', e)">
                    <el-option v-for="group in groups" :key="group.id" :label="group.name" :value="group.id" />
                </el-select>
            </div>
            <div v-else-if="model.assignType === 'custom'" class="panelRow">
                <div>{{i18n['userTask.assignType.custom.title']}}：</div>
                <el-input style="width:90%; font-size:12px"
                          :value="model.javaClass"
                          :disabled="readOnly"
                          @input="(e) => onChange('javaClass', e.target.value)" />
            </div>
            <div class="panelRow">
                <div style="display:inline">{{i18n['userTask.dueDate']}}：</div>
                <el-date-picker type="datetime"
                                style="width:90%; min-width:null"
                                :placeholder="i18n['userTask.dueDate.placeholder']"
                                :disabled="readOnly"
                                :value="model.dueDate"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                @input="(value) => onChange('dueDate', value)" />
            </div>
            <div class="panelRow">
                <el-checkbox @change="(value) => onChange('isSequential', value)"
                             :disabled="readOnly"
                             :value="!!model.isSequential">{{i18n['userTask.counterSign']}}</el-checkbox>
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
      users: {
        type: Array,
        default: ()=>([]),
      },
      groups: {
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
  }
</script>
