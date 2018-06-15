/*
  vue version 2.5.17-beta.0  
*/

class Vue {
  constructor (options) {
    const vm = this
    const data = vm.$data = vm.options.data;
  }
}

window.vm = new Vue({
  el: '#app',
  data: {
    message: 'hello world 33',
    test: 'testmsg'
  }
});
setInterval(() => {
  if (Math.random() < 0.5) {
    vm.$data.message = Math.random();
  } else {
    vm.$data.test = Math.random();
  }
  // vm.update()
}, 1000)
