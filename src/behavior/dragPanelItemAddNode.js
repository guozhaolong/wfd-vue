import editorStyle from "../util/defaultStyle";
import { getShapeName } from '../util/clazz';

export default function(G6){
  G6.registerBehavior('dragPanelItemAddNode', {
    getDefaultCfg() {
      return {

      };
    },
    getEvents() {
      return {
        'canvas:mousemove': 'onMouseMove',
        'canvas:mouseup': 'onMouseUp',
        'canvas:mouseleave': 'onMouseLeave',
      }
    },
    onMouseMove(e){
      if(this.graph.get('onDragAddNode')){
        let delegateShape = this.graph.get('addDelegateShape');
        const addModel = this.graph.get('addModel');
        const width = parseInt(addModel.size.split('*')[0]);
        const height = parseInt(addModel.size.split('*')[1]);
        const point = this.graph.getPointByClient(e.x,e.y);
        const x = point.x;
        const y = point.y;
        if (!delegateShape) {
          const parent = this.graph.get('group');
          delegateShape = parent.addShape('rect', {
            attrs: {
              width,
              height,
              x: x - width / 2,
              y: y - height / 2,
              ...editorStyle.nodeDelegationStyle,
            }
          });
          delegateShape.set('capture', false);
          this.graph.set('addDelegateShape', delegateShape);
        }
        delegateShape.attr({ x: x - width / 2, y: y - height / 2 });
        this.graph.paint();
        this.graph.emit('afternodedrag',delegateShape);
      }
    },
    onMouseUp(e){
      if(this.graph.get('onDragAddNode')) {
        const p = this.graph.getPointByClient(e.clientX,e.clientY);
        if(p.x > 0 && p.y > 0)
          this._addNode(p);
      }
    },
    onMouseLeave(e){
      if(this.graph.get('onDragAddNode')) {
        this._clearDelegate();
        this.graph.emit('afternodedragend');
      }
    },
    _clearDelegate(){
      if(this.graph.get('onDragAddNode')) {
        const delegateShape = this.graph.get('addDelegateShape');
        if (delegateShape) {
          delegateShape.remove();
          this.graph.set('addDelegateShape', null);
          this.graph.paint();
        }
      }
    },
    _addNode(p){
      if(this.graph.get('onDragAddNode')) {
        const addModel = this.graph.get('addModel');
        const { clazz = 'userTask' } = addModel;
        addModel.shape = getShapeName(clazz);
        const timestamp = new Date().getTime();
        const id = clazz + timestamp;
        const x = p.x;
        const y = p.y;
        if(this.graph.executeCommand) {
          this.graph.executeCommand('add', {
            type: 'node',
            addModel: {
              ...addModel,
              x: x,
              y: y,
              id: id,
            },
          });
        }else {
          this.graph.add('node', {
            ...addModel,
            x: x,
            y: y,
            id: id,
          });
        }
      }
    }
  });
}