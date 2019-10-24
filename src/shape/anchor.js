import editorStyle from "../util/defaultStyle";
import G6 from '@antv/g6';
const SingleShapeMixin = require('@antv/g6/src/shape/single-shape-mixin');
const { mix } = G6.Util;
export default function(G6){
  G6.Shape.registerFactory('anchor', {
    defaultShapeType: 'marker'
  });
  G6.Shape.registerAnchor('single-anchor', mix({}, SingleShapeMixin, {
    itemType: 'anchor',

    drawShape(cfg, group) {
      const shapeType = this.shapeType;
      const style = this.getShapeStyle(cfg);
      const shape = group.addShape(shapeType, {
        attrs: style
      });
      return shape;
    },

    setState(name, value, item) {
      if(name === 'active-anchor') {
        if(value) {
          this.update({style: {...editorStyle.anchorPointHoverStyle}}, item);
        }else{
          this.update({style: {...editorStyle.anchorPointStyle}}, item);
        }
      }
    }
  }));
  G6.Shape.registerAnchor('marker',{ shapeType:'marker' },'single-anchor');
}
