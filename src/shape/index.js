import registerAnchor from './anchor'
import registerNode from './node'
import registerFlowNode from './flowNode'
import registerEdge from './edge'

export default function(G6){
  registerAnchor(G6);
  registerNode(G6);
  registerFlowNode(G6);
  registerEdge(G6);
}
