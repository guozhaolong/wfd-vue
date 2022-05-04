<template>
    <div class="itemPanel" :style="{'height': height+'px'}">
        <el-collapse v-model="activeNames" >
            <el-collapse-item :title="i18n['start']" name="1">
                <img :data-item="startEventData"
                     :src="require('../assets/flow/start.svg')" style="width:42px;height:42px" />
                <div>{{i18n['startEvent']}}</div>
                <img :data-item="timeStartEventData"
                     :src="require('../assets/flow/timer-start.svg')" style="width:42px;height:42px" />
                <div>{{i18n['timerEvent']}}</div>
                <img :data-item="messageStartEventData"
                     :src="require('../assets/flow/message-start.svg')" style="width:42px;height:42px" />
                <div>{{i18n['messageEvent']}}</div>
                <img :data-item="signalStartEventData"
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
                <img :data-item="sendTaskData"
                     :src="require('../assets/flow/send-task.svg')" style="width:80px;height:44px" />
                <div>{{i18n['sendTask']}}</div>
                <img :data-item="receiveTaskData"
                     :src="require('../assets/flow/receive-task.svg')" style="width:80px;height:44px" />
                <div>{{i18n['receiveTask']}}</div>
                <img :data-item="callActivityData"
                     :src="require('../assets/flow/call-activity.svg')" style="width:80px;height:44px" />
                <div>{{i18n['callActivity']}}</div>
            </el-collapse-item>
            <el-collapse-item :title="i18n['gateway']" name="3">
                <img :data-item="exclusiveGatewayData"
                     :src="require('../assets/flow/exclusive-gateway.svg')" style="width:48px;height:48px" />
                <div>{{i18n['exclusiveGateway']}}</div>
                <img :data-item="parallelGatewayData"
                     :src="require('../assets/flow/parallel-gateway.svg')" style="width:48px;height:48px" />
                <div>{{i18n['parallelGateway']}}</div>
                <img :data-item="inclusiveGatewayData"
                     :src="require('../assets/flow/inclusive-gateway.svg')" style="width:48px;height:48px" />
                <div>{{i18n['inclusiveGateway']}}</div>
            </el-collapse-item>
            <el-collapse-item :title="i18n['catch']" name="4">
                <img :data-item="timerCatchEventData"
                     :src="require('../assets/flow/timer-catch.svg')" style="width:58px;height:38px" />
                <div>{{i18n['timerEvent']}}</div>
                <img :data-item="messageCatchEventData"
                     :src="require('../assets/flow/message-catch.svg')" style="width:58px;height:38px" />
                <div>{{i18n['messageEvent']}}</div>
                <img :data-item="signalCatchEventData"
                     :src="require('../assets/flow/signal-catch.svg')" style="width:58px;height:38px" />
                <div>{{i18n['signalEvent']}}</div>
            </el-collapse-item>
            <el-collapse-item :title="i18n['end']" name="5">
                <img :data-item="endEventData"
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

        startEventData: "{type:'start-event',size:'30*30',label:''}",
        timeStartEventData: "{type:'timer-start-event',size:'30*30',label:''}",
        messageStartEventData: "{type:'message-start-event',size:'30*30',label:''}",
        signalStartEventData: "{type:'signal-start-event',size:'30*30',label:''}",

        userTaskData: "{type:'user-task',size:'80*44',label:'"+this.i18n['userTask']+"'}",
        scriptTaskData: "{type:'script-task',size:'80*44',label:'"+this.i18n['scriptTask']+"'}",
        serviceTaskData: "{type:'service-task',size:'80*44',label:'"+this.i18n['serviceTask']+"'}",
        sendTaskData: "{type:'send-task',size:'80*44',label:'"+this.i18n['sendTask']+"'}",
        receiveTaskData: "{type:'receive-task',size:'80*44',label:'"+this.i18n['receiveTask']+"'}",
        callActivityData: "{type:'call-activity',size:'80*44',label:'"+this.i18n['callActivity']+"'}",

        exclusiveGatewayData: "{type:'exclusive-gateway',size:'40*40',label:''}",
        parallelGatewayData: "{type:'parallel-gateway',size:'40*40',label:''}",
        inclusiveGatewayData: "{type:'inclusive-gateway',size:'40*40',label:''}",

        timerCatchEventData: "{type:'timer-catch-event',size:'50*30',label:''}",
        messageCatchEventData: "{type:'message-catch-event',size:'50*30',label:''}",
        signalCatchEventData: "{type:'signal-catch-event',size:'50*30',label:''}",

        endEventData: "{type:'end-event',size:'30*30',label:''}",
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
