<template>
    <div :data-type="model.type" style="height: 100%">
        <div class="panel-title">{{i18n['process']}}</div>
        <el-scrollbar wrap-style="overflow-x: hidden !important;" class="panel-body" >
            <div class="panel-row">
                <div>{{i18n['process.id']}}：</div>
                <el-input style="width:90%; font-size:12px"
                          :disabled="readOnly"
                          :value="model.id"
                          @input="(value) => {onChange('id', value)}" />
            </div>
            <div class="panel-row">
                <div>{{i18n['process.name']}}：</div>
                <el-input style="width:90%; font-size:12px"
                          :disabled="readOnly"
                          :value="model.name"
                          @input="(value) => {onChange('name', value)}" />
            </div>
            <div class="panel-row">
              <div>{{i18n['process.form']}}：</div>
              <el-select style="width:90%; font-size:12px"
                         :disabled="readOnly"
                         :value="model.form"
                         :filterable="true"
                         clearable
                         @change="(e) => {this.$emit('get-form-fields', e); onChange('form', e)}">
                <!-- get-form-fields 用于流程表单切换时动态获取表单字段 -->
                <el-option v-for="form in formsCopy" :key="form.id" :label="form.name" :value="form.id" />
              </el-select>
            </div>
            <div class="panel-row">
              <div>{{i18n['process.starterUsers']}}：</div>
              <el-select style="width:90%; font-size:12px"
                         :placeholder="i18n['process.starterUsers.placeholder']"
                         :disabled="readOnly"
                         :value="model.starterUsers"
                         :multiple="true"
                         :filterable="true"
                         @change="(e) => onChange('starterUsers', e)">
                <el-option v-for="user in usersCopy" :key="user.id" :label="user.name" :value="user.id" />
              </el-select>
            </div>
            <div class="panel-row">
              <div>{{i18n['process.starterGroups']}}：</div>
              <el-select style="width:90%; font-size:12px"
                         :placeholder="i18n['process.starterGroups.placeholder']"
                         :value="model.starterGroups"
                         :disabled="readOnly"
                         :multiple="true"
                         :filterable="true"
                         @change="(e) => onChange('starterGroups', e)">
                <el-option v-for="group in groupsCopy" :key="group.id" :label="group.name" :value="group.id" />
              </el-select>
            </div>
            <div class="panel-row">
              <div style="display:inline">{{i18n['timeLimit']}}：</div>
              <el-input-number style="width: 100px;"
                               :value="model.timeLimit"
                               :min="1"
                               :disabled="readOnly"
                               controls-position="right"
                               @change="(e) => {onChange('timeLimit', e)}"></el-input-number>
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
            <div class="panel-row">
                <div>
                    {{i18n['process.dataObjs']}}：
                    <el-button :disabled="readOnly" size="mini" @click="()=>{showDialog('dataObjs')}">{{i18n['tooltip.edit']}}</el-button>
                </div>
            </div>
            <div class="panel-row">
                <div>
                    {{i18n['process.signalDefs']}}：
                    <el-button :disabled="readOnly" size="mini" @click="()=>{showDialog('signalDefs')}">{{i18n['tooltip.edit']}}</el-button>
                </div>
            </div>
            <div class="panel-row">
                <div>
                    {{i18n['process.messageDefs']}}：
                    <el-button :disabled="readOnly" size="mini" @click="()=>{showDialog('messageDefs')}">{{i18n['tooltip.edit']}}</el-button>
                </div>
            </div>
        </el-scrollbar>

        <el-dialog :title="i18n[`process.${table}`]" :visible.sync="dialogVisible" @close="closeDialog" append-to-body width="60%">
          <ele-table-editor
              v-if="table === 'dataObjs'"
              ref="dataObjs"
              :columns="dataObjsColumns"
              :rules="dataObjsRules"
              :isShowAdd="false"
              v-model="tempModel.dataObjs">
          </ele-table-editor>
          <ele-table-editor
              v-else-if="table === 'signalDefs'"
              ref="signalDefs"
              :columns="signalDefsColumns"
              :rules="signalDefsRules"
              :isShowAdd="false"
              v-model="tempModel.signalDefs">
          </ele-table-editor>
          <ele-table-editor
              v-else-if="table === 'messageDefs'"
              ref="messageDefs"
              :columns="messageDefsColumns"
              :rules="messageDefsRules"
              :isShowAdd="false"
              v-model="tempModel.messageDefs">
          </ele-table-editor>
          <span slot="footer" class="dialog-footer">
            <el-button style="float: left;" @click="handleAdd">新 增</el-button>
            <el-button @click="dialogVisible = false" type="danger">取 消</el-button>
            <el-button type="primary" @click="handleSubmit">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>
<script>
  import EleTableEditor from 'ele-table-editor'
  export default {
    inject: ['i18n'],
    props: {
      height: {
        type: Number,
        default: 800,
      },
      model: {
        type:Object,
        default: ()=>({}),
      },
      forms: {
        type: Array,
        default: ()=>([]),
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
    components: {
      EleTableEditor
    },
    data() {
      return {
        formsCopy: this.forms,
        usersCopy: this.users,
        groupsCopy: this.groups,
        table: '',
        dialogVisible: false,
        dataObjsColumns: [
          {
            type: 'index'
          },
          {
            prop: 'id',
            label: 'ID',
            content: {
              type: 'el-input',
            }
          },
          {
            prop: 'name',
            label: '名称',
            content: {
              type: 'el-input',
            }
          },
          {
            prop: 'type',
            label: '类型',
            content: {
              type: 'el-select',
              options: [
                { name: 'string', id: 'string' },
                { name: 'boolean', id: 'boolean' },
                { name: 'datetime', id: 'datetime' },
                { name: 'double', id: 'double' },
                { name: 'int', id: 'int' },
                { name: 'long', id: 'long' }
              ],
              prop: {
                text: 'name',
                value: 'id'
              }
            }
          },
          {
            prop: 'defaultValue',
            label: '默认值',
            content: {
              type: 'el-input',
            }
          }
        ],
        signalDefsColumns: [
          {
            type: 'index'
          },
          {
            prop: 'id',
            label: 'ID',
            content: {
              type: 'el-input',
            }
          },
          {
            prop: 'name',
            label: '名称',
            content: {
              type: 'el-input',
            }
          },
          {
            prop: 'scope',
            label: '作用域',
            content: {
              type: 'el-select',
              options: [
                { name: '全局', id: 'global' },
                { name: '流程实例', id: 'processInstance' },
              ],
              prop: {
                text: 'name',
                value: 'id'
              }
            }
          }
        ],
        messageDefsColumns: [
          {
            type: 'index'
          },
          {
            prop: 'id',
            label: 'ID',
            content: {
              type: 'el-input',
            }
          },
          {
            prop: 'name',
            label: '名称',
            content: {
              type: 'el-input',
            }
          }
        ],
        dataObjsRules: {
          id: { required: true, message: 'ID 必填' },
          name: { required: true, message: '名称必填' },
          type: { required: true, message: '类型必填' },
        },
        signalDefsRules: {
          id: { required: true, message: 'ID 必填' },
          name: { required: true, message: '名称必填' },
          scope: { required: true, message: '作用域必填' },
        },
        messageDefsRules: {
          id: {required: true, message: 'ID 必填'},
          name: {required: true, message: '名称必填'},
        },
        tempModel: {}
      }
    },
    methods: {
      showDialog(table) {
        this.table = table
        this.tempModel = JSON.parse(JSON.stringify(this.model))
        this.dialogVisible = true
      },
      handleAdd() {
        this.$refs[this.table].handleAdd();
      },
      handleSubmit() {
        this.$refs[this.table].validate().then(()=>{
          this.dialogVisible = false
          this.model[this.table] = JSON.parse(JSON.stringify(this.tempModel[this.table]))
        }).catch(({ errors, fields }) => {
          errors.forEach(error => setTimeout(() => {
            this.$message.error(error.message)
          }, 50))
        })
      },
      closeDialog() {
        this.tempModel = {}
        this.$refs[this.table].errorList = []
      }
    }
  }
</script>
