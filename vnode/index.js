class VNode {
  constructor (tag, children, text) {
    this.tag = tag
    this.children = children
    this.text = text
    return this
  }
}
class Vue {
  constructor (options) {
    const el = document.querySelector(options.el)
    this.mount(el)
  }
  mount (el) {
    const vnode = this.render()
    this.patch(el, vnode)
  }
  render () {
    return new VNode('div', [
      new VNode('h3', [
        new VNode(undefined, undefined, 'hello world')
      ])
    ]);
  }
  patch (rootVNode, vnode) {
    this.createElm(vnode)
    const parent = rootVNode.parentNode
    parent.insertBefore(vnode.$el, rootVNode)
    parent.removeChild(rootVNode)
    return vnode.$el
  }
  createElm (vnode) {
    const tag = vnode.tag
    const children = vnode.children
    if (tag) {
      vnode.$el = document.createElement(tag)
      if (children) {
        this.createChildren(vnode, children)
      }
    } else {
      vnode.$el = document.createTextNode(vnode.text)
    }
    return vnode.$el;
  }
  createChildren (vnode, children) {
    for (const vnodeChild of children) {
      vnode.$el.appendChild(this.createElm(vnodeChild))
    }
  }
}

const vm = new Vue({
  el: '#app'
});
