import editorStyle from "../util/defaultStyle";
import Anchor from '../item/anchor';

const dashArray = [
    [0, 1],
    [0, 2],
    [1, 2],
    [0, 1, 1, 2],
    [0, 2, 1, 2],
    [1, 2, 1, 2],
    [2, 2, 1, 2],
    [3, 2, 1, 2],
    [4, 2, 1, 2]
];
const interval = 9;
const lineDash = [4, 2, 1, 2];

const nodeDefinition = {
    options: {
        icon: null,
        iconStyle: {
            width: 14,
            height: 14,
            left: 0,
            top: 0,
        },
        style: {
            fill: '#f9f9f9',
            stroke: '#bbb',
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
            const anchorContainer = group.addGroup();
            const anchor = new Anchor({
                group: anchorContainer,
                index: i,
                model: {
                    style: {
                        x: bbox.minX + bbox.width * p[0],
                        y: bbox.minY + bbox.height * p[1]
                    }
                }
            });
            group.anchorShapes.push(anchorContainer);
        });
    },
    initAnchor(group) {
        group.anchorShapes = [];
        group.showAnchor = () => {
            this.drawAnchor(group);
        };
        group.getAllAnchors = () => {
            return group.anchorShapes.map(c => {
                c.filter(a => a.isAnchor)
            })
        };
        group.getAnchor = (i) => {
            return group.anchorShapes.filter(a => a.get('index') === i)
        };
        group.clearAnchor = () => {
            group.anchorShapes && group.anchorShapes.forEach(a => a.remove());
            group.anchorShapes = [];
        };
        group.clearHotpotActived = () => {
            group.anchorShapes && group.anchorShapes.forEach(a => {
                if (a.isAnchor)
                    a.setHotspotActived(false);
            });
        };
    },
    drawShape(cfg, group) {
        const shapeType = this.shapeType;
        let style = this.getShapeStyle(cfg);
        const shape = group.addShape(shapeType, {
            attrs: {
                ...style,
            }
        });
        this.drawIcon(cfg, group);
        this.initAnchor(group);
        return shape;
    },
    drawIcon(cfg, group) {
        let style = this.getShapeStyle(cfg);
        if (this.options.icon) {
            let attrs = {
                x: style.x + this.options.iconStyle.left,
                y: style.y + this.options.iconStyle.top,
                width: this.options.iconStyle.width,
                height: this.options.iconStyle.height,
            };
            if (this.shapeType === 'circle') {
                attrs = {
                    x: style.x - style.r + this.options.iconStyle.left,
                    y: style.y - style.r + this.options.iconStyle.top,
                    width: this.options.iconStyle.width,
                    height: this.options.iconStyle.height,
                }
            } else if (this.shapeType === 'path') {
                attrs = {
                    x: this.options.iconStyle.left,
                    y: this.options.iconStyle.top,
                    width: this.options.iconStyle.width,
                    height: this.options.iconStyle.height,
                }
            }
            group.icon = group.addShape('image', {
                attrs: {
                    img: this.options.icon,
                    ...attrs,
                },
                draggable: true,
            });
            if (cfg.hideIcon) {
                group.icon.hide();
            }
        }
    },
    setState(name, value, item) {
        const group = item.getContainer();
        if (name === 'show-anchor') {
            if (value) {
                group.showAnchor();
            } else {
                group.clearAnchor();
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
                if (text)
                    text.attr('cursor', this.options.stateStyles.hover.cursor);
            } else {
                rect.attr('cursor', this.options.style.cursor);
                if (text)
                    text.attr('cursor', this.options.style.cursor);
            }
        }
        this.setCustomState(name, value, item);
    },
    setCustomState(name, value, item) {

    },
    getAnchorPoints() {
        return [
            [0.5, 0], // top
            [1, 0.5], // right
            [0.5, 1], // bottom
            [0, 0.5], // left
        ]
    },
    runAnimate(cfg, group) {
        if (cfg.active) {
            let totalArray = [];
            let index = 0;
            const shape = group.getFirst();
            shape.animate(
                (ratio) => {
                    for (let i = 0; i < 9; i += interval) {
                        totalArray = totalArray.concat(lineDash);
                    }
                    const cfg = {
                        lineDash: dashArray[index].concat(totalArray)
                    };
                    index = (index + 1) % interval;
                    return cfg;
                },
                {
                    repeat: true,
                    duration: 5000
                });
        }
    },
    afterDraw(cfg, group) {
        this.runAnimate(cfg, group);
    },
    afterUpdate(cfg, group) {
        const icon = group.get('group').icon;
        if (cfg.hideIcon && icon && icon.get('visible')) {
            icon.hide();
        } else if (!cfg.hideIcon && icon && !icon.get('visible')) {
            icon.show();
        }
    },
};

const taskDefaultOptions = {
    icon: null,
    iconStyle: {
        width: 12,
        height: 12,
        left: 2,
        top: 2,
    },
    style: {
        ...editorStyle.nodeStyle,
        fill: '#E7F7FE',
        stroke: '#1890FF',
        cursor: 'default',
    },
    stateStyles: {
        selected: {
            fill: '#95D6FB',
        },
        hover: {
            cursor: editorStyle.cursor.hoverNode,
        }
    }
};

const gatewayDefaultOptions = {
    icon: null,
    iconStyle: {
        width: 20,
        height: 20,
        left: 2,
        top: 2,
    },
    style: {
        ...editorStyle.nodeStyle,
        fill: '#E8FEFA',
        stroke: '#13C2C2',
        cursor: 'default',
    },
    stateStyles: {
        selected: {
            fill: '#8CE8DE',
        },
        hover: {
            cursor: editorStyle.cursor.hoverNode,
        }
    }
};

const startDefaultOptions = {
    icon: null,
    iconStyle: {
        width: 18,
        height: 18,
        left: 6,
        top: 6,
    },
    style: {
        ...editorStyle.nodeStyle,
        fill: '#FEF7E8',
        stroke: '#FA8C16',
        cursor: 'default',
    },
    stateStyles: {
        selected: {
            fill: '#FCD49A',
        },
        hover: {
            cursor: editorStyle.cursor.hoverNode,
        }
    }
};

const endDefaultOptions = {
    icon: null,
    iconStyle: {
        width: 18,
        height: 18,
        left: 6,
        top: 6,
    },
    style: {
        ...editorStyle.nodeStyle,
        fill: '#EFF7E8',
        stroke: '#F5222D',
        cursor: 'default',
    },
    stateStyles: {
        selected: {
            fill: '#CFD49A',
        },
        hover: {
            cursor: editorStyle.cursor.hoverNode,
        }
    }
};

const catchDefaultOptions = {
    icon: null,
    iconStyle: {
        width: 20,
        height: 20,
        left: -10,
        top: -8,
    },
    style: {
        ...editorStyle.nodeStyle,
        fill: '#FEF7E8',
        stroke: '#FA8C16',
        cursor: 'default',
    },
    stateStyles: {
        selected: {
            fill: '#FCD49A',
        },
        hover: {
            cursor: editorStyle.cursor.hoverNode,
        }
    }
};

export default function (G6) {
    G6.registerNode('base-node', nodeDefinition, 'single-node');

    G6.registerNode('task', {
        shapeType: 'rect',
        options: {
            ...taskDefaultOptions
        },
        getShapeStyle(cfg) {
            cfg.size = [80, 44];
            const width = cfg.size[0];
            const height = cfg.size[1];
            const style = {
                x: 0 - width / 2,
                y: 0 - height / 2,
                width,
                height,
                ...this.options.style,
            };
            return style;
        }
    }, 'base-node');
    G6.registerNode('user-task', {
        options: G6.Util.deepMix({}, taskDefaultOptions, {
            icon: require('../assets/icons/flow/icon_user.svg'),
            style: {
                fill: '#E7F7FE',
                stroke: '#1890FF',
            },
            stateStyles: {
                selected: {
                    fill: '#95D6FB',
                },
            }
        }),
    }, 'task');
    G6.registerNode('script-task', {
        options: G6.Util.deepMix({}, taskDefaultOptions, {
            icon: require('../assets/icons/flow/icon_script.svg'),
            style: {
                fill: '#FFF7E6',
                stroke: '#FFA940',
            },
            stateStyles: {
                selected: {
                    fill: '#FFE7BA',
                },
            }
        }),
    }, 'task');
    G6.registerNode('service-task', {
        options: G6.Util.deepMix({}, taskDefaultOptions, {
            icon: require('../assets/icons/flow/icon_service.svg'),
            style: {
                fill: '#FFF1F0',
                stroke: '#FF4D4F',
            },
            stateStyles: {
                selected: {
                    fill: '#FFCCC7',
                },
            }
        }),
    }, 'task');
    G6.registerNode('mail-task', {
        options: G6.Util.deepMix({}, taskDefaultOptions, {
            icon: require('../assets/icons/flow/icon_mail.svg'),
            style: {
                fill: '#F6FFED',
                stroke: '#73D13D',
            },
            stateStyles: {
                selected: {
                    fill: '#D9F7BE',
                },
            }
        }),
    }, 'task');
    G6.registerNode('receive-task', {
        options: G6.Util.deepMix({}, taskDefaultOptions, {
            icon: require('../assets/icons/flow/icon_receive.svg'),
            style: {
                fill: '#FFF0F6',
                stroke: '#FF85C0',
            },
            stateStyles: {
                selected: {
                    fill: '#FFD6E7',
                },
            }
        }),
    }, 'task');
    G6.registerNode('call-activity', {
        options: G6.Util.deepMix({}, taskDefaultOptions, {
            icon: require('../assets/icons/flow/icon_call_activity.svg'),
            style: {
                fill: '#D0D0FF',
                stroke: '#9966CC',
            },
            stateStyles: {
                selected: {
                    fill: '#CCB2E6',
                },
            }
        }),
    }, 'task');

    G6.registerNode('gateway', {
        shapeType: 'path',
        labelPosition: 'bottom',
        options: {
            ...gatewayDefaultOptions
        },
        getShapeStyle(cfg) {
            cfg.size = [40, 40];
            const width = cfg.size[0];
            const height = cfg.size[1];
            const gap = 4;
            const style = {
                path: [
                    ['M', 0 - gap, 0 - height / 2 + gap],
                    ['Q', 0, 0 - height / 2, gap, 0 - height / 2 + gap],
                    ['L', width / 2 - gap, 0 - gap],
                    ['Q', width / 2, 0, width / 2 - gap, gap],
                    ['L', gap, height / 2 - gap],
                    ['Q', 0, height / 2, 0 - gap, height / 2 - gap],
                    ['L', -width / 2 + gap, gap],
                    ['Q', -width / 2, 0, -width / 2 + gap, 0 - gap],
                    ['Z']
                ],
                ...this.options.style,
            };
            return style;
        },
    }, 'base-node');
    G6.registerNode('exclusive-gateway', {
        afterDraw(cfg, group) {
            group.icon = group.addShape('path', {
                attrs: {
                    path: [
                        ['M', -8, -8],
                        ['L', 8, 8],
                        ['Z'],
                        ['M', 8, -8],
                        ['L', -8, 8],
                        ['Z']
                    ],
                    lineWidth: 2,
                    stroke: this.options.style.stroke,
                },
                draggable: true
            });
            this.runAnimate(cfg, group);
        },
    }, 'gateway');
    G6.registerNode('parallel-gateway', {
        afterDraw(cfg, group) {
            group.icon = group.addShape('path', {
                attrs: {
                    path: [
                        ['M', 0, -10],
                        ['L', 0, 10],
                        ['Z'],
                        ['M', -10, 0],
                        ['L', 10, 0],
                        ['Z']
                    ],
                    lineWidth: 2,
                    stroke: this.options.style.stroke,
                },
                draggable: true
            });
            this.runAnimate(cfg, group);
        },
    }, 'gateway');
    G6.registerNode('inclusive-gateway', {
        afterDraw(cfg, group) {
            group.icon = group.addShape('circle', {
                attrs: {
                    x: 0,
                    y: 0,
                    r: 10,
                    lineWidth: 2,
                    stroke: this.options.style.stroke,
                },
                draggable: true
            });
            this.runAnimate(cfg, group);
        },
    }, 'gateway');

    G6.registerNode('start-event', {
        shapeType: 'circle',
        labelPosition: 'bottom',
        options: {
            ...startDefaultOptions
        },
        getShapeStyle(cfg) {
            cfg.size = [30, 30];
            const width = cfg.size[0];
            const style = {
                x: 0,
                y: 0,
                r: width / 2,
                ...this.options.style,
            };
            if (cfg.hasOwnProperty('color')) {
                style.fill = cfg.color
            }
            return style;
        },
        afterDraw(cfg, group) {
            if (cfg.active) {
                const shape = group.get('children')[0];
                shape.animate({
                    repeat: true,
                    onFrame(ratio) {
                        const diff = ratio <= 0.5 ? ratio * 10 : (1 - ratio) * 10;
                        let radius = cfg.size;
                        if (isNaN(radius)) radius = radius[0];
                        return {
                            r: radius / 2 + diff
                        }
                    }
                }, 3000, 'easeCubic');
            }
            group.icon = group.addShape('path', {
                attrs: {
                    path: [
                        ['M', -4, -6],
                        ['L', 6, 0],
                        ['L', -4, 6],
                        ['Z'] // close
                    ],
                    fill: this.options.style.stroke,
                    stroke: this.options.style.stroke,
                },
                draggable: true
            });
        },
        getAnchorPoints() {
            return [
                [0.5, 0], // top
                [1, 0.5], // right
                [0.5, 1], // bottom
            ]
        }
    }, 'base-node');
    G6.registerNode('end-event', {
        shapeType: 'circle',
        labelPosition: 'bottom',
        options: {
            ...endDefaultOptions
        },
        getShapeStyle(cfg) {
            cfg.size = [30, 30];
            const width = cfg.size[0];
            const style = {
                x: 0,
                y: 0,
                r: width / 2,
                ...this.options.style,
            };
            if (cfg.hasOwnProperty('color')) {
                style.fill = cfg.color
            }
            return style;
        },
        afterDraw(cfg, group) {
            if (cfg.active) {

            }
            group.icon = group.addShape('path', {
                attrs: {
                    path: [
                        ['M', -4, -4],
                        ['L', 4, -4],
                        ['L', 4, 4],
                        ['L', -4, 4],
                        ['Z'] // close
                    ],
                    fill: this.options.style.stroke,
                    stroke: this.options.style.stroke,
                },
                draggable: true
            });
        },
        getAnchorPoints() {
            return [
                [0.5, 0], // top
                [0.5, 1], // bottom
                [0, 0.5], // left
            ]
        }
    }, 'base-node');
    G6.registerNode('catch-event', {
        shapeType: 'path',
        labelPosition: 'bottom',
        options: {
            ...catchDefaultOptions
        },
        getShapeStyle(cfg) {
            cfg.size = [50, 30];
            const width = cfg.size[0];
            const height = cfg.size[1];
            const style = {
                path: [
                    ['M', 0, -height / 3],
                    ['L', width / 2, -height / 3],
                    ['L', 0, height / 3 * 2],
                    ['L', -width / 2, -height / 3],
                    ['Z'] // close
                ],
                ...this.options.style,
            };
            return style;
        },
        getAnchorPoints() {
            return [
                [0.5, 0], // top
                [0.8, 0.38], // right
                [0.5, 1], // bottom
                [0.2, 0.38], // left
            ]
        }
    }, 'base-node');

    G6.registerNode('timer-start-event', {
        options: G6.Util.deepMix({}, startDefaultOptions, {icon: require('../assets/icons/flow/icon_timer.svg')}),
        afterDraw(cfg, group) {
            this.runAnimate(cfg, group)
        },
    }, 'start-event');
    G6.registerNode('message-start-event', {
        options: G6.Util.deepMix({}, startDefaultOptions, {icon: require('../assets/icons/flow/icon_message.svg')}),
        afterDraw(cfg, group) {
            this.runAnimate(cfg, group)
        },
    }, 'start-event');
    G6.registerNode('signal-start-event', {
        options: G6.Util.deepMix({}, startDefaultOptions, {icon: require('../assets/icons/flow/icon_signal.svg')}),
        afterDraw(cfg, group) {
            this.runAnimate(cfg, group)
        },
    }, 'start-event');

    G6.registerNode('timer-catch-event', {
        options: G6.Util.deepMix({}, catchDefaultOptions, {icon: require('../assets/icons/flow/icon_timer.svg')}),
    }, 'catch-event');
    G6.registerNode('signal-catch-event', {
        options: G6.Util.deepMix({}, catchDefaultOptions, {icon: require('../assets/icons/flow/icon_signal.svg')}),
    }, 'catch-event');
    G6.registerNode('message-catch-event', {
        options: G6.Util.deepMix({}, catchDefaultOptions, {icon: require('../assets/icons/flow/icon_message.svg')}),
    }, 'catch-event');
}
