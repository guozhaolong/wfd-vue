<template>
  <div class="root">
    <ToolbarPanel ref="toolbar" v-if="!isView" />
    <div style="display: flex">
      <ItemPanel ref="addItemPanel" v-if="!isView" :height="height"/>
      <div ref="canvas" class="canvasPanel" :style="{'height':height+'px','width':isView?'100%':'70%','border-bottom':isView?0:null}"></div>
      <DetailPanel ref="detailPanel"
                   v-if="!isView"
                   :height="height"
                   :model="selectedModel"
                   :readOnly="mode !== 'edit'"
                   :users="users"
                   :groups="groups"
                   :forms="forms"
                   :formFields="formFields"
                   :signalDefs="processModel.signalDefs"
                   :messageDefs="processModel.messageDefs"
                   :onChange="(key,val)=>{onItemCfgChange(key,val)}" />
    </div>
  </div>
</template>
<script>
  import G6 from '@antv/g6/lib';
  import { getShapeName } from '../util/clazz'
  import Command from '../plugins/command'
  import Toolbar from '../plugins/toolbar'
  import AddItemPanel from '../plugins/addItemPanel'
  import CanvasPanel from '../plugins/canvasPanel'
  import ToolbarPanel from '../components/ToolbarPanel'
  import ItemPanel from '../components/ItemPanel'
  import DetailPanel from '../components/DetailPanel'
  import i18n from '../locales'
  import registerShape from '../shape'
  import registerBehavior from '../behavior'
  import {exportImg} from '../util/export'
  registerShape(G6);
  registerBehavior(G6);
  export default {
    name: "wfd-vue",
    components: {
      ToolbarPanel,
      ItemPanel,
      DetailPanel
    },
    provide() {
      return {
        i18n: i18n[this.lang]
      }
    },
    props: {
      isView: {
        type: Boolean,
        default: false,
      },
      mode: {
        type: String,
        default: "edit"
      },
      height: {
        type: Number,
        default: 800,
      },
      lang: {
        type: String,
        default: "zh"
      },
      data: {
        type: Object,
        default: () => ({nodes:[],edges:[]})
      },
      processData: {
        type: Object,
        default: () => ({
          id: '',
          name: '',
          form: '',
          clazz: 'process',
          dataObjs: [],
          signalDefs: [],
          messageDefs: [],
        })
      },
      users: {
        type: Array,
        default: () => ([])
      },
      groups: {
        type: Array,
        default: () => ([])
      },
      forms: {
        type: Array,
        default: () => ([])
      }
    },
    data() {
      return {
        resizeFunc: ()=>{},
        selectedModel: {},
        processModel: this.processData,
        graph:null,
        cmdPlugin: null,
      };
    },
    watch:{
      data(oldData,newData){
        if(oldData !== newData) {
          if (this.graph) {
            this.graph.changeData(this.initShape(newData));
            this.graph.setMode(this.mode);
            this.graph.emit('canvas:click');
            if (this.cmdPlugin) {
              this.cmdPlugin.initPlugin(this.graph);
            }
            if (this.isView) {
              this.graph.fitView(5)
            }
          }
        }
      },
    },
    methods: {
      initShape(data){
        if(data && data.nodes){
          return {
            nodes: data.nodes.map(node => {
              return {
                type: getShapeName(node.clazz),
                ...node,
              }
            }),
            edges: data.edges
          }
        }
        return data;
      },
      initEvents(){
        this.graph.on('afteritemselected',(items)=>{
          if(items && items.length > 0) {
            const item = this.graph.findById(items[0]);
            this.selectedModel = {...item.getModel()};
          } else {
            this.selectedModel = this.processModel;
          }
        });
        const page = this.$refs['canvas'];
        const graph = this.graph;
        const height = this.height-1;
        this.resizeFunc = ()=>{
          graph.changeSize(page.offsetWidth,height);
        };
        window.addEventListener("resize", this.resizeFunc);

        // 修复删除元素后 toolbar 点击移动到上一层、移动到下一层报错
        this.graph.on('afterdelete',()=>{
          this.graph.set('selectedItems', []);
          this.selectedModel = this.processModel;
        });
      },
      onItemCfgChange(key,value){
        const items = this.graph.get('selectedItems');
        if(items && items.length > 0){
          const item = this.graph.findById(items[0]);
          if(this.graph.executeCommand) {
            this.graph.executeCommand('update', {
              itemId: items[0],
              updateModel: {[key]: value}
            });
          }else {
            this.graph.updateItem(item, {[key]: value});
          }
          this.selectedModel = {...item.getModel()};
        } else {
          const canvasModel = { ...this.processModel, [key]: value};
          this.selectedModel = canvasModel;
          this.processModel = canvasModel;
        }
      },
      async validate() {
        // 后续此处部分验证需要放置各组件详情配置里
        // 流程信息验证
        // 验证表单
        let valid = true
        if (!this.forms.some(form => {return form.id === this.processModel.form})) {
          await this.$message({
            message: '流程表单选择不正确',
            type: 'error'
          })
          valid = false
        }
        // 验证流程标识
        if (!this.processModel.id) {
          await this.$message({
            message: '流程标识必填',
            type: 'error'
          })
          valid = false
        }
        // 验证流程名称
        if (!this.processModel.name) {
          await this.$message({
            message: '流程名称必填',
            type: 'error'
          })
          valid = false
        }
        const userIds = this.users.map(user => user.id)
        const groupIds = this.groups.map(group => group.id)
        if ((!this.processModel.starterUsers || this.processModel.starterUsers.length === 0) && (!this.processModel.starterGroups || this.processModel.starterGroups.length === 0)) {
          await this.$message({
            message: '至少需要设置一个流程发起用户或流程发起组',
            type: 'error'
          })
          valid = false
        }
        // 验证发起人
        if (this.processModel.starterUsers && this.processModel.starterUsers.length !== 0 && !userIds.some(id => this.processModel.starterUsers.includes(id))) {
          await this.$message({
            message: '流程发起用户选择不正确',
            type: 'error'
          })
          valid = false
        }
        // 验证发起组
        if (this.processModel.starterGroups && this.processModel.starterGroups.length !== 0 && !groupIds.some(id => this.processModel.starterGroups.includes(id))) {
          await this.$message({
            message: '流程发起组选择不正确',
            type: 'error'
          })
          valid = false
        }
        // 验证时间和单位
        if ((this.processModel.timeLimit && !this.processModel.timeLimitUnit) || (!this.processModel.timeLimit && this.processModel.timeLimitUnit)) {
          await this.$message({
            message: '时限和单位需同时填写（或均不填）',
            type: 'error'
          })
          valid = false
        }

        // 验证节点
        for (let node of this.graph.save().nodes) {
          if (['start', 'userTask'].includes(node.clazz)) {
            // 验证表单字段
            const formFieldIds = this.formFields.map(field => field.id)
            if (node.readonlyFormFields && node.readonlyFormFields.length !== 0 && !formFieldIds.some(id => node.readonlyFormFields.includes(id))) {
              await this.$message({
                message: `【${node.label}】节点的只读表单字段选择不正确`,
                type: 'error'
              })
              valid = false
            }
            if (node.hiddenFormFields && node.hiddenFormFields.length !== 0 && !formFieldIds.some(id => node.hiddenFormFields.includes(id))) {
              await this.$message({
                message: `【${node.label}】节点的隐藏表单字段选择不正确`,
                type: 'error'
              })
              valid = false
            }
            if (node.readonlyFormFields && node.hiddenFormFields && node.readonlyFormFields.some(id => node.hiddenFormFields.includes(id))) {
              await this.$message({
                message: `【${node.label}】节点的只读表单字段和隐藏表单字段不能有重复字段`,
                type: 'error'
              })
              valid = false
            }
          }

          if (node.clazz === 'userTask') {
            // 验证指派类型
            if (!['assignee', 'candidate'].includes(node.assignType)) {
              await this.$message({
                message: `【${node.label}】节点的指派类型选择不正确`,
                type: 'error'
              })
              valid = false
            }
            // 验证用户和组
            if (node.assignType === 'assignee' && (!node.assignee || !userIds.some(id => id === node.assignee))) {
              await this.$message({
                message: `【${node.label}】节点的受理人选择不正确`,
                type: 'error'
              })
              valid = false
            }
            if (node.assignType === 'candidate') {
              if ((!node.candidateUsers || node.candidateUsers.length === 0) && (!node.candidateGroups || node.candidateGroups.length === 0)) {
                await this.$message({
                  message: `【${node.label}】节点至少需要设置一个候选用户或候选组`,
                  type: 'error'
                })
                valid = false
              }
              if(node.candidateUsers && node.candidateUsers.length !== 0 && !userIds.some(id => node.candidateUsers.includes(id))) {
                await this.$message({
                  message: `【${node.label}】节点的候选用户选择不正确`,
                  type: 'error'
                })
                valid = false
              }
              if (node.candidateGroups && node.candidateGroups.length !== 0 && !groupIds.some(id => node.candidateGroups.includes(id))) {
                await this.$message({
                  message: `【${node.label}】节点的候选组选择不正确`,
                  type: 'error'
                })
                valid = false
              }
            }
          }
        }
        return new Promise((resolve, reject) => {
          valid ? resolve(valid) : reject(valid)
        })
      }
    },
    destroyed(){
      window.removeEventListener("resize", this.resizeFunc);
      this.graph.getNodes().forEach(node => {
        node.getKeyShape().stopAnimate();
      });
    },
    mounted() {
      let plugins = [];
      if(!this.isView){
        this.cmdPlugin = new Command();
        const toolbar = new Toolbar({container:this.$refs['toolbar'].$el});
        const addItemPanel = new AddItemPanel({container:this.$refs['addItemPanel'].$el});
        const canvasPanel = new CanvasPanel({container:this.$refs['canvas']});
        plugins = [ this.cmdPlugin,toolbar,addItemPanel,canvasPanel ];
      }
      const width = this.$refs['canvas'].offsetWidth;
      this.graph = new G6.Graph({
        plugins: plugins,
        container: this.$refs['canvas'],
        height: this.height,
        width: width,
        fitView: true,
        modes: {
          default: ['drag-canvas', 'clickSelected'],
          view: [ ],
          edit: [ 'drag-canvas', 'zoom-canvas', 'drag-node', 'hoverNodeActived','hoverAnchorActived','dragEdge',
            'dragPanelItemAddNode','clickSelected','deleteItem','itemAlign'],
        },
        defaultEdge: {
          type: 'flow-polyline-round',
        },
      });
      this.graph.saveImg = (createFile = true) => exportImg(this.$refs['canvas'],this.processModel.name,createFile);
      if(this.isView)
        this.graph.setMode('view');
      else
        this.graph.setMode(this.mode);
      this.graph.data(this.initShape(this.data));
      this.graph.render();
      if(this.isView && this.data && this.data.nodes){
        this.graph.fitView(5)
      }
      this.initEvents();
    },
    created() {
      this.selectedModel = this.processModel
    },
    computed: {
      formFields: function () {
        const form = this.processModel.form ? this.forms.filter(form => form.id === this.processModel.form)[0] : undefined
        return (form && form.fields) ? form.fields : []
      }
    }
  };
</script>
<style lang="scss" scoped>
    .root{
        width: 100%;
        height: 100%;
        background-color: #fff;
        display: block;
    }
    .canvasPanel {
        flex: 0 0 auto;
        float: left;
        width:70%;
        background-color: #fff;
        border-bottom: 1px solid #E9E9E9;
    }
</style>
