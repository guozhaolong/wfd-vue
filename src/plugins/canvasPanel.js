const deepMix = require('@antv/util/lib/deep-mix');
const each = require('@antv/util/lib/each');
const wrapBehavior = require('@antv/util/lib/event/wrap-behavior');
const createDOM = require('@antv/util/lib/dom/create-dom');
const modifyCSS = require('@antv/util/lib/dom/modify-css');

class CanvasPanel {

  constructor(cfgs) {
    this._cfgs = deepMix(this.getDefaultCfg(), cfgs);
  }
  getDefaultCfg() {
    return { container: null };
  }

  get(key) {
    return this._cfgs[key];
  }
  set(key, val) {
    this._cfgs[key] = val;
  }

  initPlugin(graph) {
    const parentNode = this.get('container');
    parentNode.addEventListener('dragover', e => {
      graph.emit('canvas:mousemove',e);
    });
    parentNode.addEventListener('dragleave', e => {
      graph.emit('canvas:mouseleave',e);
    });
  }

  destroy() {
    this.get('canvas').destroy();
    const container = this.get('container');
    container.parentNode.removeChild(container);
  }
}

export default CanvasPanel;
