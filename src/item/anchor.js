import editorStyle from '../util/defaultStyle';
const Item = require('@antv/g6/src/item/item');

const createAnchor = (index,style,group) => {
  const anchorContainer = group.addGroup();
  const anchor = new Item({
    type: 'anchor',
    group: anchorContainer,
    capture: false,
    index,
    isActived: false,
    model: {
      style: {
        ...style,
        ...editorStyle.anchorPointStyle,
        cursor: editorStyle.cursor.hoverEffectiveAnchor,
      }
    },
  });
  anchor.isAnchor = true;
  anchor.toFront();
  let hotpot;
  anchor.showHotpot = function () {
    hotpot = anchorContainer.addShape('marker', {
      attrs: {
        ...style,
        ...editorStyle.anchorHotsoptStyle
      }
    });
    hotpot.toFront();
    anchor.getKeyShape().toFront();
  };
  anchor.setActived = function () {
    anchor.update({style: {...editorStyle.anchorPointHoverStyle}});
  };
  anchor.clearActived = function () {
    anchor.update({style: {...editorStyle.anchorPointStyle}});
  };
  anchor.setHotspotActived = function (act) {
    hotpot &&
    (act ?
      hotpot.attr(editorStyle.anchorHotsoptActivedStyle)
      : hotpot.attr(editorStyle.anchorHotsoptStyle))
  };
  return anchorContainer;
};

export default createAnchor;
