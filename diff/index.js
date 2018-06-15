class Vnode {
  constructor (tag, children, text, $el) {
    this.tag = tag
    this.children = children
    this.text = text
    this.$el = $el
    return this
  }
}

class Vue {
  constructor (options) {
    const vm = this
    vm.$options = options
    this.$el = document.querySelector(options.el)
    vm.initState(vm)
    vm.mount(this.$el)
  }
  mount ($el) {
    this.update()
  }
  // vue/src/core/instance/state.js
  initState (vm) {
    const data = vm.$data = vm.$options.data
    const keys = Object.keys(data)
    let i = keys.length
    while (i--) {
      this.proxy(vm, keys[i])
    }
  }
  update () {
    const vm = this
    const preVNode = vm._vnode
    vm._vnode = this.render()
    if (!preVNode) {
      vm.patch(vm.$el, vm._vnode)
    } else {
      console.log(preVNode.children[0].children[0].text, vm._vnode.children[0].children[0].text)
      vm.patch(preVNode, vm._vnode)
    }
  }
  proxy (vm, key) {
    Object.defineProperty(vm, key, {
      configurable: true,
      enumerable: true,
      get () {
        return vm.$data[key]
      },
      set (val) {
        vm.$data[key] = val
      }
    })
  }
  render () {
    return new Vnode('div', [
      new Vnode('h3', [
        new Vnode(undefined, undefined, this.message)
      ])
    ]);
  }
  sameVnode (vnode1, vnode2) {
    return (
      vnode1.tag === vnode2.tag
    )
  }

  updateChildren (oldCh, ch) {
    if (this.sameVnode(oldCh[0], ch[0])) {
      this.patchVnode(oldCh[0], ch[0])
    } else {
      this.patch(oldCh[0], ch[0])
    }
  }
  patchVnode (oldVnode, vnode) {
    const $el = vnode.$el = oldVnode.$el
    const oldCh = oldVnode.children
    const ch = vnode.children
    if (!vnode.text) {
      if (oldCh && ch) {
        this.updateChildren(oldCh, ch)
      }
    } else if (oldVnode.text !== vnode.text) {
      $el.textContent = vnode.text;
    }
  }
  // vue/src/core/vdom/patch.js
  patch (oldVnode, vnode) {
    const isRealElement = oldVnode.nodeType !== undefined

    if (!isRealElement && this.sameVnode(oldVnode, vnode)) {
      this.patchVnode(oldVnode, vnode);
    } else {
      if (isRealElement) {
        oldVnode = new Vnode(oldVnode.tagName.toLowerCase(), undefined, undefined, oldVnode)
      }
      const $el = oldVnode.$el;
      const parent = $el.parentNode;
      this.createElm(vnode)
      parent.insertBefore(vnode.$el, $el)
      parent.removeChild($el)
    }
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

window.vm = new Vue({
  el: '#app',
  data: {
    message: 'hello world 33'
  }
});
setTimeout(() => {
  vm.message = 1233
  vm.update()
}, 1000)
