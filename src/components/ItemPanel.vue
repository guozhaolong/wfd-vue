<template>
    <div class="itemPanel" :style="{'height': height+'px'}">
        <el-collapse v-model="activeNames" >
            <el-collapse-item :title="i18n['start']" name="1">
                <img data-item="{type:'start-node',size:'30*30',label:''}"
                     :src="require('../assets/flow/start.svg')" style="width:42px;height:42px" />
                <div>{{i18n['startEvent']}}</div>
                <img data-item="{type:'timer-start-node',size:'30*30',label:''}"
                     :src="require('../assets/flow/timer-start.svg')" style="width:42px;height:42px" />
                <div>{{i18n['timerEvent']}}</div>
                <img data-item="{type:'message-start-node',size:'30*30',label:''}"
                     :src="require('../assets/flow/message-start.svg')" style="width:42px;height:42px" />
                <div>{{i18n['messageEvent']}}</div>
                <img data-item="{type:'signal-start-node',size:'30*30',label:''}"
                     :src="require('../assets/flow/signal-start.svg')" style="width:42px;height:42px" />
                <div>{{i18n['signalEvent']}}</div>
            </el-collapse-item>
            <el-collapse-item :title="i18n['task']" name="2">
                <img :data-item="userTaskData"
                     :src="require('../assets/flow/user-task.svg')" style="width:80px;height:44px" />
                <div>{{i18n['userTask']}}</div>
                <img :data-item="scriptTaskData"
                     :src="require('../assets/flow/script-task.svg')" style="width:80px;height:44px" />
                <div>{{i18n['scriptTask']}}</div>
                <img :data-item="serviceTaskData"
                     :src="require('../assets/flow/service-task.svg')" style="width:80px;height:44px" />
                <div>{{i18n['serviceTask']}}</div>
                <img :data-item="mailTaskData"
                     :src="require('../assets/flow/mail-task.svg')" style="width:80px;height:44px" />
                <div>{{i18n['mailTask']}}</div>
                <img :data-item="receiveTaskData"
                     :src="require('../assets/flow/receive-task.svg')" style="width:80px;height:44px" />
                <div>{{i18n['receiveTask']}}</div>
                <img :data-item="callActivityData"
                     :src="require('../assets/flow/call-activity.svg')" style="width:80px;height:44px" />
                <div>{{i18n['callActivity']}}</div>
            </el-collapse-item>
            <el-collapse-item :title="i18n['gateway']" name="3">
                <img data-item="{type:'exclusive-gateway-node',size:'40*40',label:''}"
                     :src="require('../assets/flow/exclusive-gateway.svg')" style="width:48px;height:48px" />
                <div>{{i18n['exclusiveGateway']}}</div>
                <img data-item="{type:'parallel-gateway-node',size:'40*40',label:''}"
                     :src="require('../assets/flow/parallel-gateway.svg')" style="width:48px;height:48px" />
                <div>{{i18n['parallelGateway']}}</div>
                <img data-item="{type:'inclusive-gateway-node',size:'40*40',label:''}"
                     :src="require('../assets/flow/inclusive-gateway.svg')" style="width:48px;height:48px" />
                <div>{{i18n['inclusiveGateway']}}</div>
            </el-collapse-item>
            <el-collapse-item :title="i18n['catch']" name="4">
                <img data-item="{type:'timer-catch-node',size:'50*30',label:''}"
                     :src="require('../assets/flow/timer-catch.svg')" style="width:58px;height:38px" />
                <div>{{i18n['timerEvent']}}</div>
                <img data-item="{type:'message-catch-node',size:'50*30',label:''}"
                     :src="require('../assets/flow/message-catch.svg')" style="width:58px;height:38px" />
                <div>{{i18n['messageEvent']}}</div>
                <img data-item="{type:'signal-catch-node',size:'50*30',label:''}"
                     :src="require('../assets/flow/signal-catch.svg')" style="width:58px;height:38px" />
                <div>{{i18n['signalEvent']}}</div>
            </el-collapse-item>
            <el-collapse-item :title="i18n['end']" name="5">
                <img data-item="{type:'end-node',size:'30*30',label:''}"
                     :src="require('../assets/flow/end.svg')" style="width:42px;height:42px" />
                <div>{{i18n['endEvent']}}</div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
  export default {
    inject: ['i18n'],
    props: {
      height: {
        type: Number,
        default: 800,
      },
    },
    data() {
      return {
        activeNames: [],
        userTaskData: "{type:'user-task-node',size:'80*44',label:'"+this.i18n['userTask']+"'}",
        scriptTaskData: "{type:'script-task-node',size:'80*44',label:'"+this.i18n['scriptTask']+"'}",
        serviceTaskData: "{type:'service-task-node',size:'80*44',label:'"+this.i18n['serviceTask']+"'}",
        mailTaskData: "{type:'mail-task-node',size:'80*44',label:'"+this.i18n['mailTask']+"'}",
        receiveTaskData: "{type:'receive-task-node',size:'80*44',label:'"+this.i18n['receiveTask']+"'}",
        callActivityData: "{type:'call-activity-node',size:'80*44',label:'"+this.i18n['callActivity']+"'}",
      };
    },
  }
</script>

<style lang="scss" >
    .itemPanel {
        float: left;
        width: 10%;
        background: #f0f2f5;
        overflow-y: auto;
        border-left: 1px solid #E9E9E9;
        border-bottom: 1px solid #E9E9E9;
        img{
            width: 92px;
            height: 96px;
            padding: 4px;
            border: 1px solid rgba(0,0,0,0);
            border-radius: 2px;
            &:hover{
                border: 1px solid #ccc;
                cursor: move;
            }
        }
        .el-collapse {
            border: 0;
            .el-collapse-item {
                > div[role=tab] > div {
                    padding-left: 10px;
                    border: 1px solid #E9E9E9;
                    border-left:0;
                }
                &:first-child{
                    > div[role=tab] > div {
                        border-top: 0;
                    }
                }
                &:last-child{
                    > div[role=tab] > div {
                        border-bottom: 1px solid #E9E9E9;
                    }
                }
                .el-collapse-item__wrap{
                    border-top: 0;
                    background: #f0f2f5;
                    text-align: center;
                }
            }
        }

    }
</style>
