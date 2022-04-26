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
                    <el-option key="assignee" value="assignee" :label="i18n['userTask.assignType.assignee']"/>
                    <el-option key="person" value="person" :label="i18n['userTask.assignType.person']"/>
                    <el-option key="persongroup" value="persongroup" :label="i18n['userTask.assignType.persongroup']"/>
                </el-select>
            </div>
            <div v-if="model.assignType === 'assignee'" class="panelRow">
                <div>{{i18n['userTask.assignType.assignee.title']}}：</div>
                <el-select style="width:90%; font-size:12px"
                           :placeholder="i18n['userTask.assignType.assignee.placeholder']"
                           :disabled="readOnly"
                           :value="model.assignValue"
                           :multiple="true"
                           :multiple-limit="1"
                           :filterable="true"
                           @change="(e) => onChange('assignValue', e)">
                    <el-option v-for="user in usersCopy" :key="user.id" :label="user.name" :value="user.id" />
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
                           @change="(e) => onChange('assignValue', e)">
                    <el-option v-for="user in usersCopy" :key="user.id" :label="user.name" :value="user.id" />
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
                           @change="(e) => onChange('assignValue', e)">
                    <el-option v-for="group in groupsCopy" :key="group.id" :label="group.name" :value="group.id" />
                </el-select>
            </div>
            <div class="panelRow">
                <div style="display:inline">{{i18n['timeLimit']}}：</div>
                <el-input-number style="width: 100px;"
                                 :value="model.timeLimit"
                                 :min="1"
                                 :disabled="readOnly"
                                 controls-position="right"
                                 @input="(value) => {onChange('timeLimit', value)}"></el-input-number>
                <el-select style="width:80px; font-size:12px; margin-left: 8px;"
                           :placeholder="i18n['timeLimit.unit']"
                           :value="model.timeLimitUnit"
                           :disabled="readOnly"
                           @change="(e) => onChange('timeLimitUnit', e)">
                  <el-option key="day" value="day" :label="i18n['timeLimit.unit.day']"/>
                  <el-option key="hour" value="hour" :label="i18n['timeLimit.unit.hour']"/>
                  <el-option key="minute" value="minute" :label="i18n['timeLimit.unit.second']"/>
                  <el-option key="second" value="second" :label="i18n['timeLimit.unit.month']"/>
                  <el-option key="month" value="month" :label="i18n['timeLimit.unit.month']"/>
                  <el-option key="year" value="year" :label="i18n['timeLimit.unit.year']"/>
                </el-select>
            </div>
            <div class="panelRow">
              <div>{{i18n['userTask.readonlyFormFields']}}：</div>
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
              <div>{{i18n['userTask.hiddenFormFields']}}：</div>
              <el-select style="width:90%; font-size:12px"
                         :disabled="readOnly"
                         :value="model.hiddenFormFields"
                         :multiple="true"
                         :filterable="true"
                         @change="(e) => onChange('hiddenFormFields', e)">
                <el-option v-for="field in formFieldsCopy" :key="field.id" :label="field.name" :value="field.id" />
              </el-select>
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
        usersCopy: this.users,
        groupsCopy: this.groups,
        formFieldsCopy: this.formFields,
      }
    }
  }
</script>
