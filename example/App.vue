<template>
  <div id="app">
    <el-button size="small" style="float:right;margin-top:8px;margin-right:8px;" @click="()=>{this.$refs['wfd'].graph.saveImg()}">导出图片</el-button>
    <el-button size="small" style="float:right;margin-top:8px;margin-right:8px;" @click="printJSON">打印 JSON</el-button>
    <el-button size="small" style="float:right;margin-top:8px;" @click="()=>{this.modalVisible=true}">查看流程图</el-button>
    <wfd-vue ref="wfd" :data="demoData" :height="600" :users="candidateUsers" :groups="candidateGroups" :lang="lang" :forms="forms" />
    <el-dialog title="查看流程图" :visible.sync="modalVisible" width="60%">
        <wfd-vue ref="wfd2" :data="demoData1" :height="300" isView />
    </el-dialog>
  </div>
</template>

<script>
import WfdVue from '../src/components/Wfd'
export default {
  name: 'app',
  components:{
    WfdVue
  },
  data () {
    return {
      modalVisible:false,
      lang: "zh",
      demoData: {
        nodes: [{ id: 'startNode1', x: 50, y: 200, label: '', type: 'start-event', },
          { id: 'startNode2', x: 50, y: 320, label: '', type: 'timer-start-event', },
          { id: 'taskNode1', x: 200, y: 200, label: '主任审批', type: 'user-task',  },
          { id: 'taskNode2', x: 400, y: 200, label: '经理审批', type: 'script-task',  },
          { id: 'gatewayNode', x: 400, y: 320, label: '金额大于1000', type: 'inclusive-gateway',  },
          { id: 'taskNode3', x: 400, y: 450, label: '董事长审批', type: 'receive-task', },
          { id: 'catchNode1', x: 600, y: 200, label: '等待结束', type: 'signal-catch-event', },
          { id: 'endNode', x: 600, y: 320, label: '', type: 'end-event', }],
        edges: [{ source: 'startNode1', target: 'taskNode1', sourceAnchor:1, targetAnchor:3, },
          { source: 'startNode2', target: 'gatewayNode', sourceAnchor:1, targetAnchor:3, },
          { source: 'taskNode1', target: 'catchNode1', sourceAnchor:0, targetAnchor:0, },
          { source: 'taskNode1', target: 'taskNode2', sourceAnchor:1, targetAnchor:3, },
          { source: 'taskNode2', target: 'gatewayNode', sourceAnchor:1, targetAnchor:0, },
          { source: 'taskNode2', target: 'taskNode1', sourceAnchor:2, targetAnchor:2, },
          { source: 'gatewayNode', target: 'taskNode3', sourceAnchor:2, targetAnchor:0, },
          { source: 'gatewayNode', target: 'endNode', sourceAnchor:1, targetAnchor:2, },
          { source: 'taskNode3', target: 'endNode', sourceAnchor:1, targetAnchor:1, },
          { source: 'catchNode1', target: 'endNode', sourceAnchor:1, targetAnchor:0, }]
      },
      demoData1:{
        nodes: [{ id: 'startNode1', x: 50, y: 200, label: '', type: 'start-event', },
          { id: 'startNode2', x: 50, y: 320, label: '', type: 'timer-start-event', },
          { id: 'taskNode1', x: 200, y: 200, label: '主任审批', type: 'user-task',  },
          { id: 'taskNode2', x: 400, y: 200, label: '经理审批', type: 'script-task', active:true },
          { id: 'gatewayNode', x: 400, y: 320, label: '金额大于1000', type: 'gateway',  },
          { id: 'taskNode3', x: 400, y: 450, label: '董事长审批', type: 'receive-task', },
          { id: 'catchNode1', x: 600, y: 200, label: '等待结束', type: 'signal-catch-event', },
          { id: 'endNode', x: 600, y: 320, label: '', type: 'end-event', }],
        edges: [{ source: 'startNode1', target: 'taskNode1', sourceAnchor:1, targetAnchor:3 },
          { source: 'startNode2', target: 'gatewayNode', sourceAnchor:1, targetAnchor:3 },
          { source: 'taskNode1', target: 'catchNode1', sourceAnchor:0, targetAnchor:0 },
          { source: 'taskNode1', target: 'taskNode2', sourceAnchor:1, targetAnchor:3 },
          { source: 'taskNode2', target: 'gatewayNode', sourceAnchor:1, targetAnchor:0 },
          { source: 'taskNode2', target: 'taskNode1', sourceAnchor:2, targetAnchor:2 },
          { source: 'gatewayNode', target: 'taskNode3', sourceAnchor:2, targetAnchor:0 },
          { source: 'gatewayNode', target: 'endNode', sourceAnchor:1, targetAnchor:2 },
          { source: 'taskNode3', target: 'endNode', sourceAnchor:1, targetAnchor:1 },
          { source: 'catchNode1', target: 'endNode', sourceAnchor:1, targetAnchor:0 }]
      },
      candidateUsers: [{id:'1',name:'Tom'},{id:'2',name:'Steven'},{id:'3',name:'Andy'}],
      candidateGroups: [{id:'1',name:'Manager'},{id:'2',name:'Security'},{id:'3',name:'OA'}],
      forms: [
        {
          "id": 1,
          "name": "表单一",
          "fields": [
            {
              "id": "hello",
              "name": "你好"
            }, {
              "id": "rate",
              "name": "评分"
            }, {
              "id": "created",
              "name": "创建时间"
            }
          ]
        }, {
          "id": 2,
          "name": "表单一",
          "fields": [
            {
              "id": "radio",
              "name": "单选框组"
            }
          ]
        }
      ]
    }
  },
  mounted() {
  },
  methods: {
    printJSON () {
      this.$refs['wfd'].validate().then(() => {
        let content = {
          data: this.$refs['wfd'].graph.save(),
          processData: this.$refs['wfd'].processModel
        }
        console.log(content)
      })
    }
  }
}
</script>

<style>
html {
  height: 100%;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
