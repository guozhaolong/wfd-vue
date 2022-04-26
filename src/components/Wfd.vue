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
                shape: getShapeName(node.clazz),
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
        // 流程表单切换时动态获取表单字段
        if (key === 'form') {
          this.$emit('get-form-fields', value)
        }

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
        // 验证表单
        let valid = true
        if (!this.forms.some(form => {return form.id === this.processModel.form})) {
          await this.$message({
            message: '流程表单选择不正确',
            type: 'error'
          })
          valid = false
        }

        // 验证节点
        for (let node of this.graph.save().nodes) {
          if (node.clazz === 'userTask') {
            // 验证表单字段
            const formFieldIds = this.formFields.map(field => field.id)
            if (node.readonlyFormFields && !formFieldIds.some(id => node.readonlyFormFields.includes(id))) {
              await this.$message({
                message: `${node.label}的只读表单字段选择不正确`,
                type: 'error'
              })
              valid = false
            }
            if (node.hiddenFormFields && !formFieldIds.some(id => node.hiddenFormFields.includes(id))) {
              await this.$message({
                message: `${node.label}的隐藏表单字段选择不正确`,
                type: 'error'
              })
              valid = false
            }

            // 验证用户和组
            const userIds = this.users.map(user => user.id)
            const groupIds = this.groups.map(group => group.id)
            const assignTitles = {assignee: '受理人', person: '候选人', persongroup: '候选组'}
            if ((['assignee', 'person'].indexOf(node.assignType) !== -1 && !userIds.some(id => node.assignValue.includes(id))) ||
                (node.assignType === 'persongroup' && !groupIds.some(id => node.assignValue.includes(id)))) {
              await this.$message({
                message: `${node.label}的${assignTitles[node.assignType]}选择不正确`,
                type: 'error'
              })
              valid = false
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
        modes: {
          default: ['drag-canvas', 'clickSelected'],
          view: [ ],
          edit: [ 'drag-canvas', 'hoverNodeActived','hoverAnchorActived','dragNode','dragEdge',
            'dragPanelItemAddNode','clickSelected','deleteItem','itemAlign'],
        },
        defaultEdge: {
          shape: 'flow-polyline-round',
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
