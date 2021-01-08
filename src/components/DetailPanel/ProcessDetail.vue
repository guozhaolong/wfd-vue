<template>
    <div :data-clazz="model.clazz">
        <div class="panelTitle">{{i18n['process']}}</div>
        <div class="panelBody">
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
                    <el-button :disabled="readOnly" size="mini" @click="()=>{showDialog('dataObjs')}">{{i18n['tooltip.edit']}}</el-button>
                </div>
            </div>
            <div class="panelRow">
                <div>
                    {{i18n['process.signalDefs']}}：
                    <el-button :disabled="readOnly" size="mini" @click="()=>{showDialog('signalDefs')}">{{i18n['tooltip.edit']}}</el-button>
                </div>
            </div>
            <div class="panelRow">
                <div>
                    {{i18n['process.messageDefs']}}：
                    <el-button :disabled="readOnly" size="mini" @click="()=>{showDialog('messageDefs')}">{{i18n['tooltip.edit']}}</el-button>
                </div>
            </div>
        </div>

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
    components: {
      EleTableEditor
    },
    data() {
      return {
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
