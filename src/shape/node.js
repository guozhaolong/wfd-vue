import editorStyle from "../util/defaultStyle";
import createAnchor from '../item/anchor';

const dashArray = [
  [0,1],
  [0,2],
  [1,2],
  [0,1,1,2],
  [0,2,1,2],
  [1,2,1,2],
  [2,2,1,2],
  [3,2,1,2],
  [4,2,1,2]
];
const interval = 9;
const lineDash = [4, 2, 1, 2];
export default function(G6) {
  G6.registerNode('base-node', {
    options:{
      icon: null,
      iconStyle: {
        width: 14,
        height: 14,
        left: 0,
        top: 0,
      },
      style:{
        fill: '#f9f9f9',
        stroke:'#bbb',
        cursor: 'default',
      },
      stateStyles: {
        selected: {
          fill: '#eee',
        },
        hover: {
          cursor: editorStyle.cursor.hoverNode,
        }
      }
    },
    drawAnchor(group) {
      const bbox = group.get('children')[0].getBBox();
      this.getAnchorPoints().forEach((p, i) => {
        const anchor = createAnchor(i,{
          x: bbox.minX + bbox.width * p[0],
          y: bbox.minY + bbox.height * p[1]
        }, group);
        group.anchorShapes.push(anchor);
        group.getAllAnchors = () => {
          return group.anchorShapes.map(c => {
            c.filter(a => a.isAnchor)
          })
        };
        group.getAnchor = (i) => {
          return group.anchorShapes.filter(a => a.get('index') === i)
        }
      });
    },
    drawShape(cfg, group) {
      const shapeType = this.shapeType;
      let style = this.getShapeStyle(cfg);
      const shape = group.addShape(shapeType, {
        attrs: {
          ...style,
        }
      });
      if(this.options.icon){
        let attrs = {
          x: style.x + this.options.iconStyle.left,
          y: style.y + this.options.iconStyle.top,
          width: this.options.iconStyle.width,
          height: this.options.iconStyle.height,
        };
        if(shapeType === 'circle'){
          attrs = {
            x: style.x- style.r + this.options.iconStyle.left,
            y: style.y - style.r + this.options.iconStyle.top,
            width: this.options.iconStyle.width,
            height: this.options.iconStyle.height,
          }
        }else if(shapeType === 'path'){
          attrs = {
            x: this.options.iconStyle.left,
            y: this.options.iconStyle.top,
            width: this.options.iconStyle.width,
            height: this.options.iconStyle.height,
          }
        }
        group.icon = group.addShape('image', {
          attrs: {
            img:this.options.icon,
            ...attrs,
          }
        });
        if(cfg.hideIcon){
          group.icon.hide();
        }
      }
      group.anchorShapes = [];
      group.showAnchor = (group) => {
        this.drawAnchor(group);
      };
      group.clearAnchor = (group) => {
        group.anchorShapes && group.anchorShapes.forEach(a => a.remove());
        group.anchorShapes = [];
      };
      group.clearHotpotActived = (group) => {
        group.anchorShapes && group.anchorShapes.forEach(a => {
          if (a.isAnchor)
            a.setHotspotActived(false);
        });
      };
      return shape;
    },
    setState(name, value, item) {
      const group = item.getContainer();
      if (name === 'show-anchor') {
        if (value) {
          group.showAnchor(group);
        } else {
          group.clearAnchor(group);
        }
      } else if (name === 'selected') {
        const rect = group.getChildByIndex(0);
        if (value) {
          rect.attr('fill', this.options.stateStyles.selected.fill);
        } else {
          rect.attr('fill', this.options.style.fill);
        }
      } else if (name === 'hover') {
        const rect = group.getChildByIndex(0);
        const text = group.getChildByIndex(1);
        if (value) {
          rect.attr('cursor', this.options.stateStyles.hover.cursor);
          if(text)
            text.attr('cursor', this.options.stateStyles.hover.cursor);
        } else {
          rect.attr('cursor', this.options.style.cursor);
          if(text)
            text.attr('cursor', this.options.style.cursor);
        }
      }
    },
    getAnchorPoints() {
      return [
        [0.5, 0], // top
        [1, 0.5], // right
        [0.5, 1], // bottom
        [0, 0.5], // left
      ]
    },
    runAnimate(cfg, group){
      if(cfg.active){
        let totalArray = [];
        let index = 0;
        const shape = group.getFirst();
        shape.animate({
          onFrame(ratio) {
            for (let i = 0; i < 9; i += interval) {
              totalArray = totalArray.concat(lineDash);
            }
            const cfg = {
              lineDash: dashArray[index].concat(totalArray)
            };
            index = (index + 1) % interval;
            return cfg;
          },
          repeat: true
        }, 5000);
      }
    },
    afterDraw(cfg, group) {
      this.runAnimate(cfg,group);
    },
    afterUpdate(cfg, group) {
      const icon = group.get('group').icon;
      if(cfg.hideIcon && icon && icon.get('visible')){
        icon.hide();
      }else if(!cfg.hideIcon && icon && !icon.get('visible')){
        icon.show();
      }
    }
  }, 'single-shape');

}
