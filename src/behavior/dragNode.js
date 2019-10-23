import editorStyle from "../util/defaultStyle";

export default function(G6){
  G6.registerBehavior('dragNode', {
    getDefaultCfg() {
      return {
        updateEdge: true,
        delegate: true,
        delegateStyle: {},
        align: true,
      };
    },
    getEvents() {
      return {
        'node:dragstart': 'onDragStart',
        'node:drag': 'onDrag',
        'node:dragend': 'onDragEnd'
      };
    },
    onDragStart(e) {
      if (!this.shouldBegin.call(this, e)) {
        return;
      }
      this.target = e.item;
      this.origin = {
        x: e.x,
        y: e.y
      };
    },
    onDrag(e) {
      if (!this.origin) {
        return;
      }
      if (!this.get('shouldUpdate').call(this, e)) {
        return;
      }
      this._update(this.target, e);
    },
    onDragEnd(e) {
      if (!this.shouldEnd.call(this, e)) {
        return;
      }
      if (!this.origin) {
        return;
      }
      const delegateShape = e.item.get('delegateShape');
      if (delegateShape) {
        delegateShape.remove();
        this.target.set('delegateShape', null);
      }
      this._update(this.target, e, true);
      this.point = null;
      this.origin = null;
      this.graph.emit('afternodedragend');
    },
    _update(item, e, force) {
      const origin = this.origin;
      const model = item.get('model');
      if (!this.point) {
        this.point = {
          x: model.x,
          y: model.y
        };
      }
      const x = e.x - origin.x + this.point.x;
      const y = e.y - origin.y + this.point.y;
      this.origin = { x: e.x, y: e.y };
      this.point = { x, y };
      if (this.delegate && !force) {
        this._updateDelegate(item, x, y);
        return;
      }
      if(this.graph.executeCommand) {
        this.graph.executeCommand('update', {
          itemId: item.get('id'),
          updateModel: {x, y}
        });
      }else {
        if (this.get('updateEdge')) {
          this.graph.updateItem(item, { x, y });
        } else {
          item.updatePosition({ x, y });
          this.graph.paint();
        }
      }
    },
    _updateDelegate(item, x, y) {
      const self = this;
      let shape = item.get('delegateShape');
      const bbox = item.get('keyShape').getBBox();
      if (!shape) {
        const parent = self.graph.get('group');
        const attrs = editorStyle.nodeDelegationStyle;
        // model上的x, y是相对于图形中心的，delegateShape是g实例，x,y是绝对坐标
        shape = parent.addShape('rect', {
          attrs: {
            width: bbox.width,
            height: bbox.height,
            x: x - bbox.width / 2,
            y: y - bbox.height / 2,
            ...attrs
          }
        });
        shape.set('capture', false);
        item.set('delegateShape', shape);
      }
      shape.attr({ x: x - bbox.width / 2, y: y - bbox.height / 2 });
      this.graph.paint();
      this.graph.emit('afternodedrag',shape);
    },
  });
}
