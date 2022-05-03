<template>
    <div class="detailPanel" :style="{'height':height+'px'}">
        <UserTaskDetail v-if="model.type === 'user-task-node'" :model="model" :onChange="onChange" :readOnly="readOnly" :users="users" :groups="groups" :formFields="formFields" />
        <ScriptTaskDetail v-else-if="model.type === 'script-task-node'" :model="model" :onChange="onChange" :readOnly="readOnly" />
        <ServiceTaskDetail v-else-if="model.type === 'service-task-node'" :model="model" :onChange="onChange" :readOnly="readOnly" />
        <ReceiveTaskDetail v-else-if="model.type === 'receive-task-node'" :model="model" :onChange="onChange" :readOnly="readOnly" />
        <MailTaskDetail v-else-if="model.type === 'mail-task-node'" :model="model" :onChange="onChange" :readOnly="readOnly" />
        <TimerEventDetail v-else-if="model.type === 'timer-start-node' || model.type === 'timer-catch-node'" :model="model" :onChange="onChange" :readOnly="readOnly" />
        <SignalEventDetail v-else-if="model.type === 'signal-start-node' || model.type === 'signal-catch-node'" :model="model" :onChange="onChange" :readOnly="readOnly" :signalDefs="signalDefs" />
        <MessageEventDetail v-else-if="model.type === 'message-start-node' || model.type === 'message-catch-node'" :model="model" :onChange="onChange" :readOnly="readOnly" :messageDefs="messageDefs" />
        <GatewayDetail v-else-if="model.type === 'gateway-node' || model.type === 'exclusive-gateway-node' || model.type === 'parallel-gateway-node' || model.type === 'inclusive-gateway-node'" :model="model" :onChange="onChange" :readOnly="readOnly" />
        <FlowDetail v-else-if="model.type === 'flow-polyline-round'" :model="model" :onChange="onChange" :readOnly="readOnly" />
        <StartEventDetail v-else-if="model.type === 'start-node'" :model="model" :onChange="onChange" :readOnly="readOnly" :formFields="formFields" />
        <EndEventDetail v-else-if="model.type === 'end-node'" :model="model" :onChange="onChange" :readOnly="readOnly" />
        <ProcessDetail v-else-if="model.type === 'process'" :model="model" :onChange="onChange" :readOnly="readOnly" :forms="forms" :users="users" :groups="groups" />
        <CallActivityDetail v-else-if="model.type === 'call-activity-node'" :model="model" :onChange="onChange" :readOnly="readOnly" />
    </div>
</template>
<script>
  import UserTaskDetail from "./UserTaskDetail"
  import ServiceTaskDetail from "./ServiceTaskDetail"
  import ScriptTaskDetail from "./ScriptTaskDetail"
  import ReceiveTaskDetail from "./ReceiveTaskDetail"
  import MailTaskDetail from "./MailTaskDetail"
  import TimerEventDetail from "./TimerEventDetail"
  import SignalEventDetail from "./SignalEventDetail"
  import MessageEventDetail from "./MessageEventDetail"
  import GatewayDetail from "./GatewayDetail"
  import FlowDetail from "./FlowDetail"
  import StartEventDetail from "./StartEventDetail"
  import EndEventDetail from "./EndEventDetail"
  import ProcessDetail from "./ProcessDetail"
  import CallActivityDetail from "./CallActivityDetail";
  export default {
    inject: ['i18n'],
    components:{
      UserTaskDetail,
      ScriptTaskDetail,
      ServiceTaskDetail,
      ReceiveTaskDetail,
      MailTaskDetail,
      TimerEventDetail,
      SignalEventDetail,
      MessageEventDetail,
      GatewayDetail,
      FlowDetail,
      StartEventDetail,
      EndEventDetail,
      ProcessDetail,
      CallActivityDetail,
    },
    props: {
      height: {
        type: Number,
        default: 800,
      },
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
      forms: {
        type: Array,
        default: ()=>([]),
      },
      formFields: {
        type: Array,
        default: ()=>([]),
      },
      signalDefs: {
        type: Array,
        default: ()=>([]),
      },
      messageDefs: {
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
<style lang="scss">
    .detailPanel {
        height: 100%;
        background: #f0f2f5;
        flex: 0 0 auto;
        float: left;
        width: 20%;
        border-right: 1px solid #E9E9E9;
        border-bottom: 1px solid #E9E9E9;
        .panelTitle {
            text-align: left;
            height: 32px;
            padding-left: 12px;
            color: #000;
            line-height: 28px;
            background: #EBEEF2;
            border-bottom: 1px solid #DCE3E8;
        }

        .panelBody {
            .panelRow {
                text-align: left;
                display: inline-block;
                font-size: 12px;
                width: 100%;
                padding: 5px 12px;
            }
        }
    }
</style>
